import { describe, test, expect } from 'vitest'
import { getDetailedManga } from '../src/index.js'

describe('getDetailedManga', () => {
  test('should return detailed manga', async () => {
    const detailedManga = await getDetailedManga('one-piece')

    expect(detailedManga).toHaveProperty('id')
    expect(detailedManga).toHaveProperty('url')
    expect(detailedManga).toHaveProperty('title')
    expect(detailedManga).toHaveProperty('genres')
    expect(detailedManga).toHaveProperty('type')
    expect(detailedManga).toHaveProperty('author')
    expect(detailedManga).toHaveProperty('releaseYear')
    expect(detailedManga).toHaveProperty('status')
    expect(detailedManga).toHaveProperty('artist')
    expect(detailedManga).toHaveProperty('description')
    expect(detailedManga).toHaveProperty('cover')
    expect(detailedManga).toHaveProperty('chapters')
  })
})
