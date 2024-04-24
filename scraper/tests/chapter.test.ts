import { describe, expect, it, test } from 'vitest';
import { getChapterImages } from '../src';
import ChapterSoloLeveling1 from './data/chapter-solo-leveling-1.json';
import ChapterSoloLeveling2 from './data/chapter-solo-leveling-2.json';
import ChapterSoloLeveling3 from './data/chapter-solo-leveling-3.json';

const sources = [
  {
    label: 'solo-leveling-1',
    url: 'https://www.mangaread.org/manga/solo-leveling-manhwa/chapter-1/',
    shouldBeExpect: ChapterSoloLeveling1,
  },
  {
    label: 'solo-leveling-2',
    url: 'https://www.mangaread.org/manga/solo-leveling-manhwa/chapter-2/',
    shouldBeExpect: ChapterSoloLeveling2,
  },
  {
    label: 'solo-leveling-3',
    url: 'https://www.mangaread.org/manga/solo-leveling-manhwa/chapter-3/',
    shouldBeExpect: ChapterSoloLeveling3,
  },
];

describe.each(sources)('Chapter', ({ url, shouldBeExpect }) => {
  it('should fetch chapter\'s images $label', async () => {
    const chapters = await getChapterImages(url);

    expect(chapters).toEqual(shouldBeExpect);
  });
});
