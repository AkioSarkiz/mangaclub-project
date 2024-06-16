import axios from 'axios'
import * as cheerio from 'cheerio'
import _ from 'lodash'
import type { ScrapedDetailedManga } from '../types/index.d.ts'

const getChapters = ($: cheerio.CheerioAPI) => {
  const allChapterSections = $('[id^="cmtb-"]')

  const chapters = allChapterSections.map((index, chapterSection) => {
    return $(chapterSection)
      .find('li')
      .map((index, chapter) => {
        return {
          title: $(chapter).find('a').text().trim() || null,
          link: $(chapter).find('a').attr('href') || null,
        }
      })
      .toArray()
  })

  return chapters.toArray()
}

export const getDetailedManga = async (id: string): Promise<ScrapedDetailedManga> => {
  const url = `https://readmanga.app/${id}`
  const response = await axios.get(url)
  const $ = cheerio.load(response.data)

  const title = $('div.mb-2:nth-child(1) > div:nth-child(2) > h2:nth-child(1)').text()

  const genres = $('.novels-detail-right > ul:nth-child(1) > li:nth-child(3) > div:nth-child(2) > a')
    .map((index, item) => $(item).text())
    .toArray()

  const type = $(
    '.novels-detail-right > ul:nth-child(1) > li:nth-child(4) > div:nth-child(2) > span:nth-child(1) > strong:nth-child(1)',
  ).text()

  const author = {
    name: $('.novels-detail-right > ul:nth-child(1) > li:nth-child(6) > div:nth-child(2) > a:nth-child(1)')
      .first()
      .text(),
    link:
      $('.novels-detail-right > ul:nth-child(1) > li:nth-child(6) > div:nth-child(2) > a:nth-child(1)')
        .first()
        .attr('href') || null,
  }
  const releaseYear = $('.manga-info__release').first().text().match(/\d+/)?.[0]
  const status = $('.novels-detail-right > ul:nth-child(1) > li:nth-child(2) > div:nth-child(2)').text()
  const artist = $('.manga-info__artist').first().text()

  const description = $('.gray-bg-color')
    .text()
    .trim()
    .replace(/\s{2,}/g, ' ')

  const cover = $('.manga-info__img > img').attr('src') || null
  const chapters = _.flatten(getChapters($))

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
  }
}
