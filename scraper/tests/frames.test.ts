import { test, expect } from 'vitest'
import { getFrames } from '../src/index.js'

test('getFrames function should return an array of Frame objects', async () => {
  const frames = await getFrames('https://rmanga.app/one-piece/chapter-1/all-pages')

  expect(Array.isArray(frames)).toBe(true)
  expect(frames.length).toBeGreaterThan(0)
  expect(frames[0]).toMatchObject({
    index: expect.any(Number),
    src: expect.any(String),
  })

  expect(frames).toStrictEqual([
    {
      index: 0,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00001.jpg',
    },
    {
      index: 1,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00002.jpg',
    },
    {
      index: 2,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00003.jpg',
    },
    {
      index: 3,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00004.jpg',
    },
    {
      index: 4,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00005.jpg',
    },
    {
      index: 5,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00006.jpg',
    },
    {
      index: 6,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00007.jpg',
    },
    {
      index: 7,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00008.jpg',
    },
    {
      index: 8,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00009.jpg',
    },
    {
      index: 9,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00010.jpg',
    },
    {
      index: 10,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00011.jpg',
    },
    {
      index: 11,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00012.jpg',
    },
    {
      index: 12,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00013.jpg',
    },
    {
      index: 13,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00014.jpg',
    },
    {
      index: 14,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00015.jpg',
    },
    {
      index: 15,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00016.jpg',
    },
    {
      index: 16,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00017.jpg',
    },
    {
      index: 17,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00018.jpg',
    },
    {
      index: 18,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00019.jpg',
    },
    {
      index: 19,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00020.jpg',
    },
    {
      index: 20,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00021.jpg',
    },
    {
      index: 21,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00022.jpg',
    },
    {
      index: 22,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00023.jpg',
    },
    {
      index: 23,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00024.jpg',
    },
    {
      index: 24,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00025.jpg',
    },
    {
      index: 25,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00026.jpg',
    },
    {
      index: 26,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00027.jpg',
    },
    {
      index: 27,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00028.jpg',
    },
    {
      index: 28,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00029.jpg',
    },
    {
      index: 29,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00030.jpg',
    },
    {
      index: 30,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00031.jpg',
    },
    {
      index: 31,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00032.jpg',
    },
    {
      index: 32,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00033.jpg',
    },
    {
      index: 33,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00034.jpg',
    },
    {
      index: 34,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00035.jpg',
    },
    {
      index: 35,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00036.jpg',
    },
    {
      index: 36,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00037.jpg',
    },
    {
      index: 37,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00038.jpg',
    },
    {
      index: 38,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00039.jpg',
    },
    {
      index: 39,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00040.jpg',
    },
    {
      index: 40,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00041.jpg',
    },
    {
      index: 41,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00042.jpg',
    },
    {
      index: 42,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00043.jpg',
    },
    {
      index: 43,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00044.jpg',
    },
    {
      index: 44,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00045.jpg',
    },
    {
      index: 45,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00046.jpg',
    },
    {
      index: 46,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00047.jpg',
    },
    {
      index: 47,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00048.jpg',
    },
    {
      index: 48,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00049.jpg',
    },
    {
      index: 49,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00050.jpg',
    },
    {
      index: 50,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00051.jpg',
    },
    {
      index: 51,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00052.jpg',
    },
    {
      index: 52,
      src: 'https://readm.today/uploads/chapter_files/5404/1/p_00053.jpg',
    },
  ])
})
