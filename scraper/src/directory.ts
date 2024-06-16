import axios from 'axios'
import * as cheerio from 'cheerio'
import type { Directory } from '../types/index.d.ts'

export const getDirectory = async (char: string): Promise<Directory[]> => {
  const response = await axios.get(`https://rmanga.app/directory/${char}`)
  const $ = cheerio.load(response.data)

  // @ts-ignore
  return $('.list-items > ul > li')
    .map((index, item) => ({ index, name: $(item).find('a').text().trim(), link: $(item).find('a').attr('href') }))
    .toArray()
}
