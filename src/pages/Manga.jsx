import { useState, useEffect } from "react";
import { mangaChapter } from "../scraping/mangaChapter";

const Manga = () => {
  const [imgBase64, setImgBase64] = useState();
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    mangaChapter(
      setImgBase64,
      setLoadedCount,
      "https://chap.mangairo.com/story-cx266105/chapter-1"
    );
  }, []);

  return (
    <div>
      {imgBase64 &&
        imgBase64.map((img, key) => (
          <img height={300} key={key} src={img} alt="manga" />
        ))}
    </div>
  );
};

export default Manga;
