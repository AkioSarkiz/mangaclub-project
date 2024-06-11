import urlJoin from 'url-join';

const BASE_URL: string = 'https://www.mangaread.org';

export const getUrl = (path: string = ''): string => {
  return path ? urlJoin(BASE_URL, path) : BASE_URL;
};
