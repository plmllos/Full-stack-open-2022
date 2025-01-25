const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  const author = _.chain(blogs)
    .countBy("author")
    .map((blogs, author) => ({ author, blogs }))
    .maxBy("blogs")
    .value();

  return {
    author: author.author,
    blogs: author.blogs,
  };
};

const mostLikes = (blogs) => {
  const author = _.chain(blogs)
    .groupBy("author")
    .map((blogs, author) => ({
      author,
      likes: _.sumBy(blogs, "likes"),
    }))
    .maxBy("likes")
    .value();

  return {
    author: author.author,
    likes: author.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
