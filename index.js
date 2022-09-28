const PORT = process.env.PORT || 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const baseURL = "https://kissasian.li/";

app.get("/", (req, res) => {
  let info = {
    popular: `http://localhost:${PORT}/api/popular/page=:page`,
    movies: `http://localhost:${PORT}/api/movies/page=:page`,
    recentlyAadded: `http://localhost:${PORT}/api/recently-added/drama/page=:page`,
    kshow: `http://localhost:${PORT}/api/kshow/page=:page`,
    search: `http://localhost:${PORT}/api/search/:word/:page`,
    episode_link: `http://localhost:${PORT}/api/watching/:id`,

    recently_added: `http://localhost:${PORT}/api/recentlyadded/:page`,
  };
  res.send(info);
});

app.get("/api/popular/page=:page", (req, res) => {
  const popular = `${baseURL}DramaList/MostPopular?page=${req.params.page}`;

  axios(popular)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const popular = [];

      $(".item-list > .item").each(function (index, element) {
        const title = $(this).find("a > img").attr().title;
        const id = $(this).find(" a").attr().href.slice(7);
        const image = $(this).find(" a > img").attr("src");

        popular.push({ title, id, image });
      });
      res.json(popular);
    })
    .catch((err) => console.log(err));
});
app.get("/api/recently-added/drama/page=:page", (req, res) => {
  const drama = `${baseURL}recently-added-drama?page=${req.params.page}`;

  axios(drama)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const drama = [];

      $(".list-episode-item >li").each(function (index, element) {
        const title = $(this).find("a").attr().title;
        const id = $(this).find(" a").attr().href.slice(33);
        const image = $(this).find(" a > img").attr("data-original");
        const time = $(this).find(" a > .time").text();
        const type = $(this).find(" a > .type").text();
        const ep = $(this).find(" a > .ep").text();
        drama.push({ title, id, image, time, type, ep });
      });
      res.json(drama);
    })
    .catch((err) => console.log(err));
});
app.get("/api/movies/page=:page", (req, res) => {
  const movies = `${baseURL}recently-added-movie?page=${req.params.page}`;

  axios(movies)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const movies = [];

      $(".list-episode-item >li").each(function (index, element) {
        const title = $(this).find("a").attr().title;
        const id = $(this).find(" a").attr().href.slice(21);
        const image = $(this).find(" a > img").attr("data-original");
        const time = $(this).find(" a > .time").text();
        const type = $(this).find(" a > .type").text();
        const ep = $(this).find(" a > .ep").text();
        movies.push({ title, id, image, time, type, ep });
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

      $(".list-episode-item >li").each(function (index, element) {
        const title = $(this).find("a").attr().title;
        const id = $(this).find(" a").attr().href.slice(33);
        const image = $(this).find(" a > img").attr("data-original");
        const time = $(this).find(" a > .time").text();
        const type = $(this).find(" a > .type").text();
        const ep = $(this).find(" a > .ep").text();

        kshow.push({ title, id, image, time, type, ep });
      });
      res.json(kshow);
    })
    .catch((err) => console.log(err));
});

app.get("/api/drama-detail-genres/:id", (req, res) => {
  const detail = `${baseURL}${req.params.id}`;
  axios(detail)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const detail = [];
      // const episodes = [];

      $(".content-left > .block > .details > .info > p ").each(function (
        index
      ) {
        const genres = $(".content-left > .block > .details > .info > p ")
          .last()
          .find("a")

          .text();
        const id = $(".content-left > .block > .details > .info > p ")
          .last()
          .find("a")

          .attr("href");

        detail.push({
          genres,
          id,
        });
      });
      res.json(detail);
    })
    .catch((err) => console.log(err));
});
app.get("/api/drama-detail/:id", (req, res) => {
  const detail = `${baseURL}Drama/${req.params.id}`;
  axios(detail)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const detail = [];
      // const episodes = [];

      $(".space-top ").each(function (index) {
        const image = $(this).find(".section > .cover > img").attr("src");
        const title = $(this).find(".gold >.heading > h3 ").text();

        const description = $(this)
          .find(".section > .info > .summary1")
          
          .text().slice(21,-17);
        // const genres = $(this)
        //   .find(".block > .details > .info > p ")
        //   .last()
        //   .children("a")
        //   .attr();

        const releaseYear = $(this)
          .find(".section > .info  > p ")
          .first()

          .next()
          
          .text().slice(32,-17);

        const status = $(this)
        .find(".section > .info  > p ")
        .first()

        .next()
        .next()
        
        .text().slice(29,-17);
        const country = $(this)
          .find(".section > .info  > a")
          
          .text()
        const views = $(this) .find(".section > .info  > p ")
        .first()

        .next()
        .next()
        .next()
        
        .text().slice(29,-17)

        detail.push({
          title,
          image,
          description,
          // genres,
          releaseYear,
          status,
          country,
          views,
        });
      });
      res.json(detail);
    })
    .catch((err) => console.log(err));
});
app.get("/api/drama-detail-cast/:id", (req, res) => {
  const detailCast = `${baseURL}series/${req.params.id}`;
  axios(detailCast)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const detailCast = [];
      // const episodes = [];

      $(".slick-slider >.slick-list > .slick-track > .item").each(function (
        index
      ) {
        const image = $(this).find(".img > img").attr().alt;
        const castName = $(this).find(".img > .title").attr();

        const id = $(this).find(".img").attr("href").slice(5);

        detailCast[index] = {
          castName,
          image,
          id,
        };
      });
      res.json(detailCast);
    })
    .catch((err) => console.log("Fuck off"));
});

app.get("/api/drama-watch-episodes/:id", (req, res) => {
  const episodes = `${baseURL}${req.params.id}`;
  axios(episodes)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const episodes = [];

      $(".all-episode > li ").each(function (index) {
        const id = $(this).children("a").attr("href").slice(21);
        const episodeTitle = $(this).children("a").children(".title").text();
        const time = $(this).children("a").children(".time").text();
        const type = $(this).children("a").children(".type").text();
        const image = $(".content-left")
          .find(".block > .details > .img > img")
          .attr("src");

        episodes.push({
          id,
          image,
          episodeTitle,
          time,
          type,
        });

        //<-- cannot be a function expression
      });
      res.json(episodes);
    })
    .catch((err) => console.log(err));
});
app.get("/api/drama-watch-servers/:id", (req, res) => {
  const watching = `${baseURL}${req.params.id}`;
  axios(watching)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const servers = [];

      $(".anime_muti_link > ul > li ").each(function (index, i) {
        const title = $(this).children().remove().end().text();
        const frame = $(this).attr("data-video");
        // const Download = $(this).find(".plugins2  ").children(".download").children("a").attr("href");

        servers[index] = { title, frame };

        //<-- cannot be a function expression
      });

      res.json({ servers });
    })
    .catch((err) => console.log(err));
});

app.get("/api/drama-watch/:id", (req, res) => {
  const moviewatch = `${baseURL}${req.params.id}`;

  axios(moviewatch)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const watch = [];

      $(".watch-drama ").each(function (index, i) {
        const title = $(this).find("h1").text();
        const frame = $(this)
          .find(
            ".block-tab > .tab-container >.tab-content > .watch-iframe > iframe"
          )
          .attr("src");
        // const Download = $(this).find(".plugins2  ").children(".download").children("a").attr("href");

        watch[index] = { title, frame };

        //<-- cannot be a function expression
      });

      res.json({ watch });
    })
    .catch((err) => console.log(err));
});
app.get("/api/search/keyword=:word/page=:page", (req, res) => {
  const search = `${baseURL}page/${req.params.page}?type=movies&s=${req.params.word}`;

  axios(search)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const search = [];

      $(".list-episode-item >li").each(function (index, element) {
        const title = $(this).find("a").attr().title;
        const id = $(this).find(" a").attr().href.slice(28);
        const image = $(this).find(" a > img").attr("data-original");
        const type = $(this).find(" a > .type").text();

        search.push({ title, id, image, type });
      });
      res.json(search);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
