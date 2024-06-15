import axios from 'axios'
import * as cheerio from 'cheerio'
import type { SearchedManga } from '../types/index.d.ts'

export interface MangaSearchParams {
  mangaName?: string
  authorName?: string
  artistName?: string
  status?: 'Both' | 'Completed' | 'Ongoing'
  type?: 'All' | 'Japanese' | 'Korean' | 'Chinese'
}


export const search = async (params: MangaSearchParams): Promise<SearchedManga[]> => {
  const formData = new FormData()
  formData.append('type', params.type || 'All')
  formData.append('manga-name', params.mangaName || '')
  formData.append('author-name', params.authorName || '')
  formData.append('artist-name', params.artistName || '')
  formData.append('status', params.status || 'Both')

  const response = await axios.post('https://readmanga.app/detailed-search', formData)
  const $ = cheerio.load(response.data)

  return $('.category-items > ul > li')
    .map((_, item) => {
      const name = $(item).find('.category-name').text()
      const link = `https://readmanga.app${$(item).find('a').attr('href')}`
      const description = $(item).find('.category-feature-content-text').text().trim()

      return { name, link, description }
    })
    .toArray()
}
