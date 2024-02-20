import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { homePage } from "../scraping/homePage";
import { Carousel } from "react-responsive-3d-carousel";

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
              <b className="text-white fs-6">{manga.title}</b>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Home;
