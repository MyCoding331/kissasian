const PORT = process.env.PORT || 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.set("trust proxy", 1);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE"); 
  res.setHeader( 
    "Access-Control-Allow-Methods", 
    "Content-Type",
    "Authorization"
  );
  next();
});
const baseURL = "https://mykissasian.com/";
// const popular = `https://dramanice.ac/most-popular-drama?page=${req.params.page}`;
// const airing = "https://animebee.to/top-airing-anime";
// const tv = `https://dramanice.ac/drama/crazy-love--detail`;
// const single = "https://animebee.to/";

app.get("/", (req, res) => {
  let info = {
    popular: `http://localhost:${PORT}/api/popular/:page`,
    movies: `http://localhost:${PORT}/api/movies/:id`,
    search: `http://localhost:${PORT}/api/search/:word/:page`,
    episode_link: `http://localhost:${PORT}/api/watching/:id`,

    recently_added: `http://localhost:${PORT}/api/recentlyadded/:page`,
  };
  res.send(info);
});

app.get("/api/movies/page=:page", (req, res) => {
  const popular = `${baseURL}category/movies?country=&page=${req.params.page}`;
  // const popular = `https://dramanice.ac/most-popular-drama?page=${req.params.page}`
  axios(popular)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const popular = [];

      $(".item-lists >.col-6").each(function (index, element) {
        const title = $(this)
          .find(
            "a > .episode-card > .episode-ratio  > .episode-detail  > div > .text-h4 "
          )
          .text();

        const id = $(this).find(" a ").attr().href.slice(7);
        const image = $(this)
          .find(
            "a > .episode-card > .episode-ratio  > .episode-detail  > div > img  "
          )
          .attr("src");
        // const date = $(this).find(".bottom > .country").text();
        popular.push({ title, id, image });
      });
      res.json(popular);
    })
    .catch((err) => console.log(err));
});
app.get("/api/kshow/page=:page", (req, res) => {
  const popular = `${baseURL}category/k-show?country=&page=${req.params.page}`;
  // const popular = `https://dramanice.ac/most-popular-drama?page=${req.params.page}`
  axios(popular)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const popular = [];

      $(".item-lists >.col-6").each(function (index, element) {
        const title = $(this)
          .find(
            "a > .episode-card > .episode-ratio  > .episode-detail  > div > .text-h4 "
          )
          .text();

        const id = $(this).find(" a ").attr().href.slice(7);
        const image = $(this)
          .find(
            "a > .episode-card > .episode-ratio  > .episode-detail  > div > img  "
          )
          .attr("src");

        popular.push({ title, id, image });
      });
      res.json(popular);
    })
    .catch((err) => console.log(err));
});
app.get("/api/ongoing-drama/page=:page", (req, res) => {
  const popular = `${baseURL}category/drama?country=&page=${req.params.page}`;
  // const popular = `https://dramanice.ac/most-popular-drama?page=${req.params.page}`
  axios(popular)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const popular = [];

      $(".item-lists >.col-6").each(function (index, element) {
        const title = $(this)
          .find(
            "a > .episode-card > .episode-ratio  > .episode-detail  > div > .text-h4 "
          )
          .text();

        const id = $(this).find(" a ").attr().href.slice(7);
        const image = $(this)
          .find(
            "a > .episode-card > .episode-ratio  > .episode-detail  > div > img  "
          )
          .attr("src");

        popular.push({ title, id, image });
      });
      res.json(popular);
    })
    .catch((err) => console.log(err));
});
app.get("/api/recently-added/page=:page", (req, res) => {
  const popular = `${baseURL}drama/${req.params.page}`;
  // const popular = `https://dramanice.ac/most-popular-drama?page=${req.params.page}`
  axios(popular)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const popular = [];

      $(".item-lists >.col-6").each(function (index, element) {
        const title = $(this)
          .find(
            "a > .episode-card > .episode-ratio  > .episode-detail  > div > .text-h4 "
          )
          .text();
        const time = $(this)
          .find(
            "a > .episode-card > .episode-ratio  > .episode-detail  > .status-type > .text-h6 "
          )
          .text();

        const episodeNo = $(this)
          .find("a > .episode-card > .episode-ratio  > .episode-number ")
          .text();
        const id = $(this).find(" a ").attr().href.slice(7);
        const image = $(this)
          .find(
            "a > .episode-card > .episode-ratio  > .episode-detail  > div > img  "
          )
          .attr("src");
        // const date = $(this).find(".bottom > .country").text();
        popular.push({ title, id, image, episodeNo, time });
      });
      res.json(popular);
    })
    .catch((err) => console.log(err));
});
app.get("/api/upcoming/", (req, res) => {
  const popular = `${baseURL}upcoming/`;
  // const popular = `https://dramanice.ac/most-popular-drama?page=${req.params.page}`
  axios(popular)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const popular = [];

      $(".item-lists >.col-6").each(function (index, element) {
        const title = $(this)
          .find(
            "a > .episode-card > .episode-ratio  > .episode-detail  > div > .text-h4 "
          )
          .text();

        const id = $(this).find(" a ").attr().href.slice(7);
        const image = $(this)
          .find(
            "a > .episode-card > .episode-ratio  > .episode-detail  > div > img  "
          )
          .attr("src");
        // const date = $(this).find(".bottom > .country").text();
        popular.push({ title, id, image });
      });
      res.json(popular);
    })
    .catch((err) => console.log(err));
});
app.get("/api/drama-detail/:id", (req, res) => {
  const tv = `${baseURL}detail/${req.params.id}`;
  axios(tv)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const tv = [];

      $(".single  > .row").each(function (index) {
        const img = $(this)
          .find(".col-12 >.row > .col-6 > .episode-ratio > img")
          .attr("src");
        const title = $(this)
          .find(".col-rightx > .box > .box-header >.film-title > a")
          .text();

        const status = $(this)
          .find(
            ".row > .col-12 > .series-details > col-12 > .status"
          )
          .text();
        const year = $(this)
          .find(
            ".row > .col-12 > .series-details > col-12 > .block > .text-light"
          )
          .text();
        const country = $(this)
          .find(
            ".row > .col-12 > .series-details > col-12 > .block > .text-light"
          )
          .text();
        const description = $(this)
          .find(".box-body >.row > #show-detailsxx > .show-synopsis > p > span")
          .text();

        tv[index]= ({
          title,
          img,
          status,
          year,
          country,
          description,
        }); //<-- cannot be a function expression
      });
      res.json(tv);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
