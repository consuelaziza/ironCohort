// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const cloudinary = require("cloudinary");
const helmet = require("helmet");
// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "ironCohort";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with ironCohort`;

const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: {
      maxAge: 1000 * 24* 60 * 60 // your cookie will be cleared after these seconds
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/basic-auth",
      // Time to Live for sessions in DB. After that time it will delete it!
      ttl: 24* 60 * 60 // your session will be cleared after these seconds
    })
  }));
app.use(helmet());

// 👇 Start handling routes here
// const index = require("./routes/index");
// app.use("/", index);
const authRoute = require("./routes/auth");
app.use("/", authRoute);

const postRoute = require("./routes/posts");
app.use("/", postRoute);

const feedRoute = require("./routes/feed");
app.use("/", feedRoute);

const profileRoute = require("./routes/auth");
app.use("/", profileRoute);

const editProfileRoute = require("./routes/editProfile");
app.use("/", editProfileRoute);

const aboutRoute = require("./routes/about");
app.use("/", aboutRoute);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
