import axios from 'axios'
import * as cheerio from 'cheerio'
import type { MangaGenre } from '../types/index.d.ts'

export const getAllGenres = async (): Promise<MangaGenre[]> => {
  const response = await axios.get('https://readmanga.app/genre/action')
  const $ = cheerio.load(response.data)

  return $('li.active > ul:nth-child(2)')
    .map((index, item) => {
      const link = $(item).find('a')
      return { name: link.text() || null, link: link.attr('href') || null }
    })
    .toArray()
}
