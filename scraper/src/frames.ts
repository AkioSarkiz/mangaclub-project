import axios from 'axios'
import * as cheerio from 'cheerio'
import { Frame } from '../types'

export const getFrames = async (chapterUrl: string): Promise<Frame[]> => {
  const response = await axios.get(chapterUrl)
  const $ = cheerio.load(response.data)

  // @ts-ignore
  return $('.chapter-detail-novel-big-image')
    .find('img')
    .map((index, element) => ({ index, src: $(element).attr('src') }))
    .toArray()
}
