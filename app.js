const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");

const Post = require("./models/post");
const User = require("./models/user");

const dbUrl = "mongodb://localhost:27017/social-media";

mongoose.connect(dbUrl, {});
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Database Connected"));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const secret = "thisissecret";

const sessionConfig = {
  // store: store,
  // store,
  name: "SocialMediaSession",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Home Route
app.get("/", (req, res) => {
  res.render("socialmedia/parallaxHome");
});

// Index Route
app.get("/feed", async (req, res) => {
  const posts = await Post.find({});
  res.render("socialmedia/index", { posts });
});

// New Post
app.get("/feed/new", (req, res) => {
  res.render("socialmedia/new");
});
app.post("/feed", async (req, res) => {
  const post = new Post(req.body.socialmedia);
  await post.save();
  res.redirect(`/feed/${post._id}`);
});

// Show One Post
app.get("/feed/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("socialmedia/show", { post });
});

// Edit Post
app.get("/feed/:id/edit", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("socialmedia/edit", { post });
});
app.put("/feed/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, { ...req.body.socialmedia });
  res.redirect(`/feed/${post._id}`);
});

// Delete Post
app.delete("/feed/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOneAndDelete(id);
  res.redirect("/feed");
});

const port = "3001";
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
