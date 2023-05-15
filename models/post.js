const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  admin: String,
  image: String,
  comments: String,
  caption: String,
});

const Post = mongoose.model("Post", PostSchema);

// const deletes = async () => {
//   await Post.deleteMany({});
// };

// deletes();

// const post = Post.insertMany([
//   // {admin:'John Wick', image:'https://deadline.com/wp-content/uploads/2023/03/Keanu-Reeves-john-wick-4.jpg', comments: 'Kill with Pencil', caption:'Baba Yaga'}
//   // {
//   //   admin: "John Cena",
//   //   image:
//   //     "https://akm-img-a-in.tosshub.com/sites/visualstory/stories/2022_11/story_13115/assets/4.jpeg?time=1668443770",
//   //   comments: "Your time is Up",
//   //   caption: "U can't see me",
//   // },
// ]);

module.exports = Post;
