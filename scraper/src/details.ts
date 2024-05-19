import * as cheerio from 'cheerio';
import axios from 'axios';
import { getUrl } from './readmanga.js';
import { DetailedChapter, DetailedManga } from './types';

function getChapters($: cheerio.CheerioAPI): DetailedChapter[] {
  const chaptersContainer = $('.version-chap');

  if (!chaptersContainer) {
    return [];
  }

  return chaptersContainer
    .find('li')
    .map((_, item) => {
      const title = $('a', item).text().trim();
      const link = $('a', item).attr('href');
      const date = $('.chapter-release-date', item)
        .text()
        .replace(/\n/g, '')
        .trim();

      if (!title || !date || !link) {
        return null;
      }

      return { title, link, date };
    })
    .filter(Boolean)
    .toArray();
}

function getGenres($: cheerio.CheerioAPI) {
  const genresElement = $('.genres-content');

  if (!genresElement.length) {
    return [];
  }

  const genres = genresElement
    .find('a')
    .map((_, element) => $(element).text().trim())
    .get();

  return genres;
}

function getType($: cheerio.CheerioAPI) {
  const typeElement = $('.summary-heading').filter(
    (_, element) => $(element).text().trim().toLocaleLowerCase() === 'type',
  );

  if (!typeElement.length) {
    return null;
  }

  const typeText = typeElement.next().text().trim();

  return typeText;
}

function getDescription($: cheerio.CheerioAPI) {
  return $('.description-summary')
    .find('.summary__content')
    .first()
    .text()
    .trim()
    .replace(/\n/g, ' ')
    .replace(/\s\s+/g, ' ');
}

function getTitle($: cheerio.CheerioAPI) {
  return $('.post-title > h1').text().trim();
}

function getAuthor($: cheerio.CheerioAPI) {
  return $('.author-content').text().trim();
}

function getArtist($: cheerio.CheerioAPI) {
  return $('.artist-content').text().trim();
}

function getReleaseYear($: cheerio.CheerioAPI) {
  const releaseElement = $('.summary-heading').filter(
    (_, element) => $(element).text().trim().toLocaleLowerCase() === 'release',
  );

  if (!releaseElement.length) {
    return null;
  }

  const releaseLink = releaseElement.next().find('a');

  if (!releaseLink.length) {
    return null;
  }

  const releaseText = releaseLink.text().trim();

  return releaseText;
}

function getStatus($: cheerio.CheerioAPI) {
  const statusElement = $('.summary-heading').filter(
    (_, element) => $(element).text().trim().toLocaleLowerCase() === 'status',
  );
  if (!statusElement.length) {
    return null;
  }
  return statusElement.next().text().trim();
}

export const getMangaDetails = async (id: string): Promise<DetailedManga> => {
  const url = getUrl(`manga/${id}/`);
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const title = getTitle($);
  const genres = getGenres($);
  const type = getType($);
  const author = getAuthor($);
  const releaseYear = getReleaseYear($);
  const status = getStatus($);
  const artist = getArtist($);
  const description = getDescription($);
  const cover = $('.summary_image img').attr('src') || null;
  const chapters = getChapters($);

  return {
    id,
    url,
    title,
    genres,
    type,
    author,
    releaseYear: releaseYear ? Number(releaseYear) : null,
    status,
    artist,
    description,
    cover,
    chapters,
  };
};
