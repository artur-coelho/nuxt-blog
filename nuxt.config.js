const pkg = require("./package");
const bodyParser = require("body-parser");
const axios = require("axios");

module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: "WD Blog",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "My cool web development blog content"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#3B8070",
    height: "4px",
    duration: 5000 /* default duration 5s */
  },

  // If the app was a spa:
  // loadingIndicator: {
  //   name: "circle",
  //   color: "fa923f"
  // },

  /*
   ** Global CSS
   */
  css: ["~assets/styles/main.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~plugins/core-components.js", "~plugins/date-filter.js"],

  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios"],
  axios: {
    baseURL:
      process.env.BASE_URL || "https://nuxt2-blog-default-rtdb.firebaseio.com",
    credentials: false
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  env: {
    baseUrl:
      process.env.NUXT_ENV_BASE_URL ||
      "https://nuxt2-blog-default-rtdb.firebaseio.com",
    fbAPIKey:
      process.env.NUXT_ENV_FBKEY || "AIzaSyCUOxqQmlJndOxwflqpPBq1l630G5u85Tg"
  },
  transition: {
    name: "fade",
    mode: "out-in"
  },
  serverMiddleware: [bodyParser.json(), "~/api"],
  generate: {
    routes: function() {
      return axios
        .get("https://nuxt2-blog-default-rtdb.firebaseio.com/posts.json")
        .then(res => {
          const routes = [];
          for (const key in res.data) {
            routes.push({
              route: "/posts/" + key,
              payload: {
                postData: res.data[key]
              }
            });
          }
          return routes;
        });
    }
  }
};
