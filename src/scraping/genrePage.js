import cheerio from "cheerio";
import { PROXY_SERVER_URL } from "../proxy/localProxy";

export const genrePage = async () => {
  let tmp = [];
  await fetch(`${PROXY_SERVER_URL}https://w.mangairo.com/home`)
    .then((res) => res.text())
    .then((text) => {
      const $ = cheerio.load(text);
      $(".panel_category a").each(async (i, item) => {
        tmp.push({ genre: $(item).text(), link: item.attribs.href });
      });
    });
  return tmp;
};
