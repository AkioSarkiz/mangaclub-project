import axios from 'axios';
import * as cheerio from 'cheerio';
import { Chapter } from './types';

export const getChapterImages = async (url: string): Promise<Chapter[]> => {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const chapterImages = $('.wp-manga-chapter-img');

  if (!chapterImages) {
    return [];
  }

  return chapterImages
    .map((index, item) => ({
      index,
      src: $(item).attr('src')?.trim(),
    }))
    .toArray();
};
