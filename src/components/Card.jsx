import { Link } from "react-router-dom";

const Card = ({ imgSrc, title, url, chapterStoryTitle, chapterStoryUrl }) => {
  return (
    <div>
      <img
        src={imgSrc}
        alt={title}
        width={200}
        height={300}
        style={{ objectFit: "cover" }}
      />
      <Link to={url}>{title}</Link>
      {chapterStoryTitle && chapterStoryUrl && (
        <Link to={chapterStoryUrl}>{chapterStoryTitle}</Link>
      )}
    </div>
  );
};

export default Card;
