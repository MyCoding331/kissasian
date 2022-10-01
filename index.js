const PORT = process.env.PORT || 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const baseURL = "https://kissasian.fan/";

app.get("/", (req, res) => {
  let info = {
    popular: `http://localhost:${PORT}/api/popular/page=:page`,
    movies: `http://localhost:${PORT}/api/movies/page=:page`,
    recentlyAadded: `http://localhost:${PORT}/api/recentlyadded/page=:page`,
    kshow: `http://localhost:${PORT}/api/kshow/page=:page`,
    search: `http://localhost:${PORT}/api/search/keyword:word/:page`,
    watching: `http://localhost:${PORT}/api/drama-watch/:id`,
    dramadetail: `http://localhost:${PORT}/api/drama-detail/:id`,
    dramaepisodes: `http://localhost:${PORT}/api/drama-episodes/:id`,

  };
  res.send(info);
});

app.get("/api/popular/page=:page", (req, res) => {
  const popular = `${baseURL}trending//page/${req.params.page}`;

  axios(popular)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const popular = [];

      $(".box > li").each(function (index, element) {
        const title = $(this).find(".mask ").attr().title;
        const id = $(this).find(" .mask ").attr().href.slice(28);
        const image = $(this).find(" .mask > img").attr("src");
        const episodes = $(this).find(" .mask > .ep").text();
        const  time = $(this).find(" .mask > .time").text();

        popular.push({ title, id, image,episodes ,time});
      });
      res.json(popular);
    })
    .catch((err) => console.log(err));
});
app.get("/api/recentlyadded/page=:page", (req, res) => {
  const drama = `${baseURL}dramas/page/${req.params.page}`;

  axios(drama)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const drama = [];

      $(".box > li").each(function (index, element) {
        const title = $(this).find(".mask ").attr().title;
        const id = $(this).find(" .mask ").attr().href.slice(28);
        const image = $(this).find(" .mask > img").attr("src");
        const episodes = $(this).find(" .mask > .ep").text();
        const  time = $(this).find(" .mask > .time").text();
        drama.push({ title, id, image, time, episodes });
      });
      res.json(drama);
    })
    .catch((err) => console.log(err));
});
app.get("/api/movies/page=:page", (req, res) => {
  const movies = `${baseURL}movies/page/${req.params.page}`;

  axios(movies)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const movies = [];

      $(".box > li").each(function (index, element) {
        const title = $(this).find(".mask ").attr().title;
        const id = $(this).find(" .mask ").attr().href.slice(28);
        const image = $(this).find(" .mask > img").attr("src");
        const episodes = $(this).find(" .mask > .ep").text();
        const  time = $(this).find(" .mask > .time").text();
        movies.push({ title, id, image, time, episodes });
      });
      res.json(movies);
    })
    .catch((err) => console.log(err));
});
app.get("/api/kshow/page=:page", (req, res) => {
  const kshow = `${baseURL}recently-added-kshow?page=${req.params.page}`;

  axios(kshow)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const kshow = [];

      $(".box  >li").each(function (index, element) {
        const title = $(this).find(".mask ").attr().title;
        const id = $(this).find(" .mask ").attr().href.slice(28);
        const image = $(this).find(" .mask > img").attr("src");
        const episodes = $(this).find(" .mask > .ep").text();
        const  time = $(this).find(" .mask > .time").text();

        kshow.push({ title, id, image, time, episodes });
      });
      res.json(kshow);
    })
    .catch((err) => console.log(err));
});
app.get("/api/drama-detail/:id", (req, res) => {
  const detail = `${baseURL}movie/${req.params.id}`;
  axios(detail)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const detail = [];
      // const episodes = [];

      $("#drama-details ").each(function (index) {
        const image = $(this).find(".wrapper > .drama-thumbnail > a > img").attr("src");
        const title = $(this).find(".wrapper > .drama-details > .entry-header > h1 ").text();

        const description = $(this)
          .find(".wrapper > .drama-details > .synopsis > p")

          .text()
         
        // const genres = $(this)
        //   .find(".block > .details > .info > p ")
        //   .last()
        //   .children("a")
        //   .attr();

        const releaseYear = $(this)
          .find(".wrapper > .drama-details > .release-year")
         

          .text().slice(39,-24)
          

        const status = $(this)
          .find(".wrapper > .drama-details > .status")
        
          .text().slice(33,-20)
         
        const country = $(this)
          .find(".wrapper > .drama-details > .country")

          .text().slice(57,-24);
        const genres = $(this)
          .find(".wrapper > .drama-details > .genres")
          
          .text().slice(57,-24)
          

        detail.push({
          title,
          image,
          description,
          genres,
          releaseYear,
          status,
          country,
         
        });
      });
      res.json(detail);
    })
    .catch((err) => console.log(err));
});
app.get("/api/drama-episodes/:id", (req, res) => {
  const episodes = `${baseURL}movie/${req.params.id}`;
  axios(episodes)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const episodes = [];

      $("#all-episodes > .list > li ").each(function (index) {
        const id = $(this).find("h3 > a ").attr("href").slice(28);
        const episode = $(this).find("h3 > a").attr("title");

        episodes.push({
          id,

          episode,
        });

        //<-- cannot be a function expression
      });
      res.json(episodes);
    })
    .catch((err) => console.log(err));
});
app.get("/api/drama-watch/:id", (req, res) => {
  const moviewatch = `${baseURL}movie/${req.params.id}`;

  axios(moviewatch)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const watch = [];

      $(".wrapper").each(function (index, i) {
        const title = $(this)
          .find(".text_above_player > h2 ")
          .text();
        const frame = $(this)
          .find(
            ".videoplayer > iframe "
          )
          .attr("src");
        // const Download = $(this).find(".plugins2  ").children(".download").children("a").attr("href");

        watch.push({ title, frame });

        //<-- cannot be a function expression
      });

      res.json({ watch });
    })
    .catch((err) => console.log(err));
});
app.get("/api/search/keyword=:word/page=:page", (req, res) => {
  const search = `${baseURL}page/${req.params.page}?s=${req.params.word}`;

  axios(search)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const search = [];

      $(".list-thumb >li").each(function (index, element) {
        const title = $(this).find(".post-thumbnail > a > img ").attr().title;
        const id = $(this).find(" .post-thumbnail > a  ").attr().href.slice(28);
        const image = $(this).find(".post-thumbnail > a > img ").attr("src");
        const type = $(this).find(".post-details > .post-cat > span > .post-categories > a").text();
        const year = $(this).find(".post-details > .post-info ").text().slice(32,-7);

        search.push({ title, id, image, type,year });
      });
      res.json(search);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
