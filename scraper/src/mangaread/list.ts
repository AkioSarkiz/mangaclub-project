import axios from 'axios';
import * as cheerio from 'cheerio';
import { getUrl } from './mangaread.js';

const getFeedParams = (page: number): URLSearchParams => {
  const params = new URLSearchParams();
  params.append('action', 'madara_load_more');
  params.append('page', page.toString());
  params.append('template', 'madara-core/content/content-archive');
  params.append('vars[wp-manga-genre]', 'manhwa');
  params.append('vars[error]', '');
  params.append('vars[m]', '');
  params.append('vars[p]', '0');
  params.append('vars[post_parent]', '');
  params.append('vars[subpost]', '');
  params.append('vars[subpost_id]', '');
  params.append('vars[attachment]', '');
  params.append('vars[attachment_id]', '0');
  params.append('vars[name]', '');
  params.append('vars[pagename]', '');
  params.append('vars[page_id]', '0');
  params.append('vars[second]', '');
  params.append('vars[minute]', '');
  params.append('vars[hour]', '');
  params.append('vars[day]', '0');
  params.append('vars[monthnum]', '0');
  params.append('vars[year]', '0');
  params.append('vars[w]', '0');
  params.append('vars[category_name]', '');
  params.append('vars[tag]', '');
  params.append('vars[cat]', '');
  params.append('vars[tag_id]', '');
  params.append('vars[author]', '');
  params.append('vars[author_name]', '');
  params.append('vars[feed]', '');
  params.append('vars[tb]', '');
  params.append('vars[paged]', '1');
  params.append('vars[meta_key]', '');
  params.append('vars[meta_value]', '');
  params.append('vars[preview]', '');
  params.append('vars[s]', '');
  params.append('vars[sentence]', '');
  params.append('vars[title]', '');
  params.append('vars[fields]', '');
  params.append('vars[menu_order]', '');
  params.append('vars[embed]', '');
  params.append('vars[ignore_sticky_posts]', 'false');
  params.append('vars[suppress_filters]', 'false');
  params.append('vars[cache_results]', 'true');
  params.append('vars[update_post_term_cache]', 'true');
  params.append('vars[update_menu_item_cache]', 'false');
  params.append('vars[lazy_load_term_meta]', 'true');
  params.append('vars[update_post_meta_cache]', 'true');
  params.append('vars[post_type]', 'wp-manga');
  params.append('vars[posts_per_page]', '100');
  params.append('vars[nopaging]', 'false');
  params.append('vars[comments_per_page]', '15');
  params.append('vars[no_found_rows]', 'false');
  params.append('vars[taxonomy]', 'wp-manga-genre');
  params.append('vars[term]', 'manhwa');
  params.append('vars[order]', 'DESC');
  params.append('vars[orderby]', 'date');
  params.append('vars[template]', 'archive');
  params.append('vars[sidebar]', 'right');
  params.append('vars[post_status]', 'publish');
  params.append('vars[meta_query][0][wp-manga-genre]', 'manhwa');
  params.append('vars[meta_query][0][error]', '');
  params.append('vars[meta_query][0][m]', '');
  params.append('vars[meta_query][0][p]', '0');
  params.append('vars[meta_query][0][post_parent]', '');
  params.append('vars[meta_query][0][subpost]', '');
  params.append('vars[meta_query][0][subpost_id]', '');
  params.append('vars[meta_query][0][attachment]', '');
  params.append('vars[meta_query][0][attachment_id]', '0');
  params.append('vars[meta_query][0][name]', '');
  params.append('vars[meta_query][0][pagename]', '');
  params.append('vars[meta_query][0][page_id]', '0');
  params.append('vars[meta_query][0][second]', '');
  params.append('vars[meta_query][0][minute]', '');
  params.append('vars[meta_query][0][hour]', '');
  params.append('vars[meta_query][0][day]', '0');
  params.append('vars[meta_query][0][monthnum]', '0');
  params.append('vars[meta_query][0][year]', '0');
  params.append('vars[meta_query][0][w]', '0');
  params.append('vars[meta_query][0][category_name]', '');
  params.append('vars[meta_query][0][tag]', '');
  params.append('vars[meta_query][0][cat]', '');
  params.append('vars[meta_query][0][tag_id]', '');
  params.append('vars[meta_query][0][author]', '');
  params.append('vars[meta_query][0][author_name]', '');
  params.append('vars[meta_query][0][feed]', '');
  params.append('vars[meta_query][0][tb]', '');
  params.append('vars[meta_query][0][paged]', '1');
  params.append('vars[meta_query][0][meta_key]', '');
  params.append('vars[meta_query][0][meta_value]', '');
  params.append('vars[meta_query][0][preview]', '');
  params.append('vars[meta_query][0][s]', '');
  params.append('vars[meta_query][0][sentence]', '');
  params.append('vars[meta_query][0][title]', '');
  params.append('vars[meta_query][0][fields]', '');
  params.append('vars[meta_query][0][menu_order]', '');
  params.append('vars[meta_query][0][embed]', '');
  params.append('vars[meta_query][0][ignore_sticky_posts]', 'false');
  params.append('vars[meta_query][0][suppress_filters]', 'false');
  params.append('vars[meta_query][0][cache_results]', 'true');
  params.append('vars[meta_query][0][update_post_term_cache]', 'true');
  params.append('vars[meta_query][0][update_menu_item_cache]', 'false');
  params.append('vars[meta_query][0][lazy_load_term_meta]', 'true');
  params.append('vars[meta_query][0][order]', 'DESC');
  params.append('vars[meta_query][0][orderby]', 'date');
  params.append('vars[meta_query][0][template]', 'archive');
  params.append('vars[meta_query][0][sidebar]', 'right');
  params.append('vars[meta_query][0][post_status]', 'publish');
  params.append('vars[meta_query][relation]', 'AND');
  return params;
};

const getTopMangaListParams = (page: number): URLSearchParams => {
  const params = new URLSearchParams();
  params.append('action', 'madara_load_more');
  params.append('page', page.toString());
  params.append('template', 'madara-core/content/content-archive');
  params.append('vars[paged]', '1');
  params.append('vars[orderby]', 'meta_value_num');
  params.append('vars[template]', 'archive');
  params.append('vars[sidebar]', 'right');
  params.append('vars[post_type]', 'wp-manga');
  params.append('vars[post_status]', 'publish');
  params.append('vars[meta_key]', '_wp_manga_week_views_value');
  params.append('vars[order]', 'desc');
  params.append('vars[meta_query][0][paged]', '1');
  params.append('vars[meta_query][0][orderby]', 'meta_value_num');
  params.append('vars[meta_query][0][template]', 'archive');
  params.append('vars[meta_query][0][sidebar]', 'right');
  params.append('vars[meta_query][0][post_type]', 'wp-manga');
  params.append('vars[meta_query][0][post_status]', 'publish');
  params.append('vars[meta_query][0][meta_key]', '_wp_manga_week_views_value');
  params.append('vars[meta_query][0][order]', 'desc');
  params.append('vars[meta_query][0][relation]', 'AND');
  params.append('vars[manga_archives_item_layout]', 'default');

  return params;
};

const getSearchParams = (query: string): URLSearchParams => {
  const params = new URLSearchParams();
  params.append('action', 'madara_load_more');
  params.append('page', '1');
  params.append('template', 'madara-core/content/content-search');
  params.append('vars[s]', query);
  params.append('vars[orderby]', '');
  params.append('vars[paged]', '1');
  params.append('vars[template]', 'search');
  params.append('vars[meta_query][0][s]', query);
  params.append('vars[meta_query][0][orderby]', '');
  params.append('vars[meta_query][0][paged]', '1');
  params.append('vars[meta_query][0][template]', 'search');
  params.append('vars[meta_query][0][meta_query][relation]', 'AND');
  params.append('vars[meta_query][0][post_type]', 'wp-manga');
  params.append('vars[meta_query][0][post_status]', 'publish');
  params.append('vars[meta_query][relation]', 'AND');
  params.append('vars[post_type]', 'wp-manga');
  params.append('vars[post_status]', 'publish');
  params.append('vars[manga_archives_item_layout]', 'default');

  return params;
};

export const getMangaFeed = async (page: number = 1) => {
  const params = getFeedParams(page);
  const url = getUrl('wp-admin/admin-ajax.php');
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url,
    data: params,
  };

  const response = await axios.request(config);
  const $ = cheerio.load(response.data);

  return $('.page-listing-item')
    .map((index, item) => ({
      cover: $('img', item).attr('src'),
      link: $('a', item).attr('href'),
      title: $('a', item).attr('title'),
    }))
    .toArray();
};

export const getTopMangaList = async (page: number = 1) => {
  const params = getTopMangaListParams(page);
  const url = getUrl('wp-admin/admin-ajax.php');
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url,
    data: params,
  };

  const response = await axios.request(config);
  const $ = cheerio.load(response.data);

  return $('.page-listing-item')
    .map((index, item) => ({
      cover: $('img', item).attr('src'),
      link: $('a', item).attr('href'),
      title: $('a', item).attr('title'),
    }))
    .toArray();
};

export const search = async (query: string) => {
  const url = getUrl('wp-admin/admin-ajax.php');
  const params = getSearchParams(query);
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url,
    data: params,
  };

  const response = await axios.request(config);

  if (!response || !response.data) {
    return [];
  }

  const $ = cheerio.load(response.data);

  return $('.row')
    .map((index, item) => {
      if (!item) {
        return false;
      }
      return {
        title: $('a', item).attr('title'),
        link: $('a', item).attr('href'),
        cover: $('.img-responsive', item).attr('src'),
        genres: $('.mg_genres a', item)
          .map((index, genre) => {
            if (!genre) {
              return false;
            }

            return { name: $(genre).text(), link: $(genre).attr('href') };
          })
          .filter(Boolean)
          .toArray(),
      };
    })
    .filter(Boolean)
    .toArray();
};
