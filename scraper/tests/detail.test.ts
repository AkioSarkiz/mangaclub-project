import { describe, test, expect, assertType } from 'vitest';
import { getMangaDetails } from '../src';
import OnaniMasterKurosawaData from './data/details-onani-master-kurosawa.json';
import BlueFlame from './data/details-blue-flame.json';
import { DetailedManga } from '../types';
import BasterdHwangYoungchan from './data/details-bastard-hwang-youngchan.json';

const mangasUrls = [
  {
    label: 'Onani Master Kurosawa',
    id: 'onani-master-kurosawa',
    shouldBeExpect: OnaniMasterKurosawaData,
  },
  {
    label: 'Blue Flame',
    id: 'blue-flame',
    shouldBeExpect: BlueFlame,
  },
  {
    label: 'bastard hwang youngchan',
    id: 'bastard-hwang-youngchan',
    shouldBeExpect: BasterdHwangYoungchan,
  },
];

describe.each(mangasUrls)(
  'details of $label',
  async ({ id, shouldBeExpect }) => {
    const detailedManga = await getMangaDetails(id);

    test('test details information', async () => {
      expect(detailedManga).toEqual(shouldBeExpect);
      assertType<DetailedManga>(detailedManga);
    });
  },
);
