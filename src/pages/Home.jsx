import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { homePage } from "../scraping/homePage";
import { Carousel } from "react-responsive-3d-carousel";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();

  useEffect(() => {
    homePage()
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="p-3 w-100">
      <div className="d-flex justify-content-between p-4">
        <SortIcon fontSize="large" />
        <h1>Manga Senpai</h1>
        <Avatar sx={{ bgcolor: "orange" }}>N</Avatar>
      </div>
      <TextField
        fullWidth
        label="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {data && (
        <div>
          <div className="mt-3">
            <p>Monthly Trending</p>
            <Carousel
              showArrows={false}
              showIndicators={false}
              showStatus={false}
              spread="wide"
            >
              {data.monthlyTrending.map((manga) => (
                <div
                  className="rounded d-flex flex-column-reverse h-100 p-4"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, transparent, black),url(${manga.banner})`,
                  }}
                >
                  <Link className="text-light">
                    <em>{manga.chapter_story_title}</em>
                  </Link>
                  <b className="text-white fs-6">{manga.title}</b>
                </div>
              ))}
            </Carousel>
          </div>
          <div>
            <p>Recently Updated</p>
            <div
              style={{
                overflowX: "auto",
              }}
              className="d-flex"
            >
              {data.recentlyUpdated.map((manga) => (
                <div className="m-2">
                  <Card
                    imgSrc={manga.banner}
                    title={manga.title}
                    url={manga.link}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <p>Recently Updated</p>
            <div
              style={{
                overflowX: "auto",
              }}
              className="d-flex"
            >
              {data.newManga.map((manga) => (
                <div className="m-2">
                  <Card
                    imgSrc={manga.banner}
                    title={manga.title}
                    url={manga.link}
                    chapterStoryTitle={manga.chapter_story_title}
                    chapterStoryUrl={manga.chapter_story_link}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
