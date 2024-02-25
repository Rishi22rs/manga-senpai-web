import cheerio from "cheerio";
import { PROXY_SERVER_URL } from "../proxy/localProxy";

export const mangaDetail = async (url) => {
  let tmp = { chapters: [] };
  await fetch(`${PROXY_SERVER_URL}${url}`)
    .then((res) => res.text())
    .then((text) => {
      const $ = cheerio.load(text);
      tmp["title"] = $(".story_info_right h1").text().trim();
      $(".story_info_right li").each((i, item) => {
        $(item).each((j, items) => {
          tmp[$(items).text().split(":")[0].replace(":", "").trim()] = $(items)
            .text()
            .split(":")[1];
        });
      });
      tmp["summary"] = $("#story_discription p").text().trim();
      tmp["banner"] = $(".story_info_left .avatar")[0].attribs.src;
      $(".chapter_list ul li a").each((i, item) => {
        tmp.chapters.push({
          chapterName: $(item).text(),
          link: item.attribs.href,
        });
      });
      $(".chapter_list ul li p").each((i, item) => {
        tmp.chapters[i]["datetime"] = $(item).text();
      });
    });
  return tmp;
};
