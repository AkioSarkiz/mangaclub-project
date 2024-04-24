import { expect, test } from 'vitest';
import { getUrl } from '../src/readmanga';

test('get base readmanga url', () => {
  const url = getUrl();
  expect(url).toBe('https://www.mangaread.org');
});

test('get readmanga url with path', () => {
  const url = getUrl('example');
  expect(url).toBe('https://www.mangaread.org/example');
});
