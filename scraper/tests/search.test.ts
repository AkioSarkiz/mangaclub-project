import { test, expect } from 'vitest'
import { search } from '../src/index.js'

test('search function should return an array of SearchedManga objects', async () => {
  const result = await search({ mangaName: 'one piece' })
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
  expect(result[0]).toMatchObject({
    name: expect.any(String),
    link: expect.stringMatching(/^https:\/\/readmanga.app\/.+/),
    description: expect.any(String),
  })
})
