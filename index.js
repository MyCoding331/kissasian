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
    recentlyAadded: `http://localhost:${PORT}/api/recently-added/drama/page=:page`,
    kshow: `http://localhost:${PORT}/api/kshow/page=:page`,
    search: `http://localhost:${PORT}/api/search/:word/:page`,
    episode_link: `http://localhost:${PORT}/api/watching/:id`,

    recently_added: `http://localhost:${PORT}/api/recentlyadded/:page`,
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

          .text()
          .slice(21, -17);
        // const genres = $(this)
        //   .find(".block > .details > .info > p ")
        //   .last()
        //   .children("a")
        //   .attr();

        const releaseYear = $(this)
          .find(".section > .info  > p ")
          .first()

          .next()

          .text()
          .slice(32, -17);

        const status = $(this)
          .find(".section > .info  > p ")
          .first()

          .next()
          .next()

          .text()
          .slice(29, -17);
        const country = $(this)
          .find(".section > .info  > a")

          .text();
        const views = $(this)
          .find(".section > .info  > p ")
          .first()

          .next()
          .next()
          .next()

          .text()
          .slice(29, -17);

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
  const detailCast = `${baseURL}Drama/${req.params.id}`;
  axios(detailCast)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const detailCast = [];
      // const episodes = [];

      $(".list-actor > .item").each(function (index) {
        const image = $(this).find(".actor-ava").attr("style").slice(21, -1);
        const castName = $(this).find(".actor-info > a").text();

        const id = $(this).find(".actor-ava").attr("href").slice(7);

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

app.get("/api/drama-episodes/:id", (req, res) => {
  const episodes = `${baseURL}Drama/${req.params.id}`;
  axios(episodes)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const episodes = [];

      $(".list > .episodeSub ").each(function (index) {
        const id = $(this).children("a").attr("href").slice(7);
        const episode = $(this).find("a > span").text();

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

app.get("/api/drama-watch/", (req, res) => {
  const moviewatch = `https://keephealth.info/p/fda-approved-weight-loss-pills-over-the-counter?sig=U2NhcmxldC1IZWFydC1SeWVvfHx8RXBpc29kZS0xfHx8MTY2NDM2Mzk1OQ==&id=30070&op=swa`;

  axios(moviewatch)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const watch = [];

      $(".main > .wrap").each(function (index, i) {
        const title = $(this)
          .find(".space-top > .gold > .heading > h3 ")
          .text();
        const frame = $(this)
          .find(
            ".space-top > .video-container > #mVideo > #document > html > body > #vstr > .jw-wrapper > .jw-media  > .jw-video "
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
