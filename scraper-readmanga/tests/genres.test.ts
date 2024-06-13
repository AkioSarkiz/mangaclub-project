import { test } from 'vitest'
import { expectTypeOf } from 'vitest'
import { getAllGenres } from '../src/index.js'
import type { MangaGenre } from '../types/index.d.ts'

test('getAllGenres should return an array of genres', async () => {
  const result = await getAllGenres()
  expectTypeOf(result).toBeArray()
  for (const genre of result) {
    expectTypeOf(genre).toMatchTypeOf<MangaGenre>()
  }
})
