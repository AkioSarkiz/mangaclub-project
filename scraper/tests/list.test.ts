import { describe, expect, test } from 'vitest';
import { getMangaFeed, getTopMangaList, search } from '../src';

const feedPages = [{ page: 1 }, { page: 2 }, { page: 3 }];

describe.each(feedPages)('get manga feed $page', async ({ page }) => {
  const details = await getMangaFeed(page);

  test('test details information', async () => {
    expect(details).toHaveLength(50);
  });
});

describe('get top manga list', () => {
  test('should return an array of manga items', async () => {
    const mangaList = await getTopMangaList();
    expect(Array.isArray(mangaList)).toBe(true);
    expect(mangaList.length).toBeGreaterThan(0);
  });
});

describe('search manga list', () => {
  test('should return an array of manga items', async () => {
    const mangaList = await search('one');
    expect(Array.isArray(mangaList)).toBe(true);
    expect(mangaList.length).toBeGreaterThan(0);
  });
});
