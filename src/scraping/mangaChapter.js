import cheerio from "cheerio";
import { PROXY_SERVER_URL } from "../proxy/localProxy";

let imgURLs = [];

export const mangaChapter = async (setImgBase64, setLoadedCount, url) => {
  let imgURLs = [];
  await fetch(`https://proxy.cors.sh/${url}`, {
    headers: {
      "x-cors-api-key": "temp_27ce5dd2f11866003fa12de4ed8a3a87",
    },
  })
    .then((res) => res.text())
    .then((text) => {
      const $ = cheerio.load(text);
      $(".panel-read-story img").each(async (i, item) => {
        imgURLs.push(item.attribs.src);
      });
    });
  let data = [];
  let urlHashtable = {};
  const chapterCount = imgURLs.length;
  let countdown = imgURLs.length;
  imgURLs.map((url) => (urlHashtable[url] = ""));
  await Promise.all(
    imgURLs.map(async (url) => {
      const response = await fetch(`https://proxy.cors.sh/${url}`, {
        headers: {
          "x-cors-api-key": "temp_27ce5dd2f11866003fa12de4ed8a3a87",
          authority: "v1.mkklcdnv6tempv2.com",
          method: "GET",
          path: "/img/tab_1/01/92/14/to970571/chapter_1_cruelty/43-o.jpg",
          scheme: "https",
          accept:
            "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          dnt: 1,
          pragma: "no-cache",
          referer: "https://chap.mangairo.com/",
          "sec-ch-ua":
            '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "Windows",
          "sec-fetch-dest": "image",
          "sec-fetch-mode": "no-cors",
          "sec-fetch-site": "cross-site",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
        },
      });
      const imageBlob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = () => {
        const base64data = reader.result;
        data.push(base64data);
        countdown--;
        setLoadedCount(((chapterCount - countdown) / chapterCount) * 100);
        urlHashtable[url] = base64data;
        countdown === 0 &&
          setImgBase64(
            Object.keys(urlHashtable).map((url) => urlHashtable[url])
          );
      };
    })
  );
  // setImgBase64(Object.keys(urlHashtable).map(url => urlHashtable[url]));
};
