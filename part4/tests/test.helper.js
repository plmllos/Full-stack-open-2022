const Blog = require("../models/blog");

const initialBlogs = [
  {
    author: "Marko Petrovic",
    url: "www.blog.com2",
    likes: 1233232,
    id: "678c2227570923e9114a1ce2",
  },
  {
    author: "Petar Petrovic",
    url: "www.blog.com23",
    likes: 1233111232,
    id: "kjsdkjsdhfkjshs3e9114a1ce2",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
