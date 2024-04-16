import axios from "axios";
import * as cheerio from "cheerio";

export const getMangaFeed = async (page: number = 1) => {
  const data = `action=madara_load_more&page=${page}&template=madara-core%2Fcontent%2Fcontent-archive&vars%5Bwp-manga-genre%5D=manhwa&vars%5Berror%5D=&vars%5Bm%5D=&vars%5Bp%5D=0&vars%5Bpost_parent%5D=&vars%5Bsubpost%5D=&vars%5Bsubpost_id%5D=&vars%5Battachment%5D=&vars%5Battachment_id%5D=0&vars%5Bname%5D=&vars%5Bpagename%5D=&vars%5Bpage_id%5D=0&vars%5Bsecond%5D=&vars%5Bminute%5D=&vars%5Bhour%5D=&vars%5Bday%5D=0&vars%5Bmonthnum%5D=0&vars%5Byear%5D=0&vars%5Bw%5D=0&vars%5Bcategory_name%5D=&vars%5Btag%5D=&vars%5Bcat%5D=&vars%5Btag_id%5D=&vars%5Bauthor%5D=&vars%5Bauthor_name%5D=&vars%5Bfeed%5D=&vars%5Btb%5D=&vars%5Bpaged%5D=1&vars%5Bmeta_key%5D=&vars%5Bmeta_value%5D=&vars%5Bpreview%5D=&vars%5Bs%5D=&vars%5Bsentence%5D=&vars%5Btitle%5D=&vars%5Bfields%5D=&vars%5Bmenu_order%5D=&vars%5Bembed%5D=&vars%5Bignore_sticky_posts%5D=false&vars%5Bsuppress_filters%5D=false&vars%5Bcache_results%5D=true&vars%5Bupdate_post_term_cache%5D=true&vars%5Bupdate_menu_item_cache%5D=false&vars%5Blazy_load_term_meta%5D=true&vars%5Bupdate_post_meta_cache%5D=true&vars%5Bpost_type%5D=wp-manga&vars%5Bposts_per_page%5D=100&vars%5Bnopaging%5D=false&vars%5Bcomments_per_page%5D=15&vars%5Bno_found_rows%5D=false&vars%5Btaxonomy%5D=wp-manga-genre&vars%5Bterm%5D=manhwa&vars%5Border%5D=DESC&vars%5Borderby%5D=date&vars%5Btemplate%5D=archive&vars%5Bsidebar%5D=right&vars%5Bpost_status%5D=publish&vars%5Bmeta_query%5D%5B0%5D%5Bwp-manga-genre%5D=manhwa&vars%5Bmeta_query%5D%5B0%5D%5Berror%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bm%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bp%5D=0&vars%5Bmeta_query%5D%5B0%5D%5Bpost_parent%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bsubpost%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bsubpost_id%5D=&vars%5Bmeta_query%5D%5B0%5D%5Battachment%5D=&vars%5Bmeta_query%5D%5B0%5D%5Battachment_id%5D=0&vars%5Bmeta_query%5D%5B0%5D%5Bname%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bpagename%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bpage_id%5D=0&vars%5Bmeta_query%5D%5B0%5D%5Bsecond%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bminute%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bhour%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bday%5D=0&vars%5Bmeta_query%5D%5B0%5D%5Bmonthnum%5D=0&vars%5Bmeta_query%5D%5B0%5D%5Byear%5D=0&vars%5Bmeta_query%5D%5B0%5D%5Bw%5D=0&vars%5Bmeta_query%5D%5B0%5D%5Bcategory_name%5D=&vars%5Bmeta_query%5D%5B0%5D%5Btag%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bcat%5D=&vars%5Bmeta_query%5D%5B0%5D%5Btag_id%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bauthor%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bauthor_name%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bfeed%5D=&vars%5Bmeta_query%5D%5B0%5D%5Btb%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bpaged%5D=1&vars%5Bmeta_query%5D%5B0%5D%5Bmeta_key%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bmeta_value%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bpreview%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bs%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bsentence%5D=&vars%5Bmeta_query%5D%5B0%5D%5Btitle%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bfields%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bmenu_order%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bembed%5D=&vars%5Bmeta_query%5D%5B0%5D%5Bignore_sticky_posts%5D=false&vars%5Bmeta_query%5D%5B0%5D%5Bsuppress_filters%5D=false&vars%5Bmeta_query%5D%5B0%5D%5Bcache_results%5D=true&vars%5Bmeta_query%5D%5B0%5D%5Bupdate_post_term_cache%5D=true&vars%5Bmeta_query%5D%5B0%5D%5Bupdate_menu_item_cache%5D=false&vars%5Bmeta_query%5D%5B0%5D%5Blazy_load_term_meta%5D=true&vars%5Bmeta_query%5D%5B0%5D%5Bupdate_post_meta_cache%5D=true&vars%5Bmeta_query%5D%5B0%5D%5Bpost_type%5D=wp-manga&vars%5Bmeta_query%5D%5B0%5D%5Bposts_per_page%5D=12&vars%5Bmeta_query%5D%5B0%5D%5Bnopaging%5D=false&vars%5Bmeta_query%5D%5B0%5D%5Bcomments_per_page%5D=25&vars%5Bmeta_query%5D%5B0%5D%5Bno_found_rows%5D=false&vars%5Bmeta_query%5D%5B0%5D%5Btaxonomy%5D=wp-manga-genre&vars%5Bmeta_query%5D%5B0%5D%5Bterm%5D=manhwa&vars%5Bmeta_query%5D%5B0%5D%5Border%5D=DESC&vars%5Bmeta_query%5D%5B0%5D%5Borderby%5D=date&vars%5Bmeta_query%5D%5B0%5D%5Btemplate%5D=archive&vars%5Bmeta_query%5D%5B0%5D%5Bsidebar%5D=right&vars%5Bmeta_query%5D%5B0%5D%5Bpost_status%5D=publish&vars%5Bmeta_query%5D%5Brelation%5D=AND`;

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://www.mangaread.org/wp-admin/admin-ajax.php",
    data: data,
  };

  const response = await axios.request(config);
  const $ = cheerio.load(response.data);

  return $(".page-listing-item")
    .map((index, item) => ({
      cover: $("img", item).attr("src"),
      link: $("a", item).attr("href"),
      title: $("a", item).attr("title"),
    }))
    .toArray();
};
