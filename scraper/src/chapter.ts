import axios from "axios";
import * as cheerio from "cheerio";

export const getChapterImages = async (url: string) => {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const chapterImages = $(".wp-manga-chapter-img");

  if (!chapterImages) {
    return [];
  }

  return chapterImages
    .map((index, item) => ({
      src: $(item).attr("src")?.trim(),
    }))
    .toArray();
};
