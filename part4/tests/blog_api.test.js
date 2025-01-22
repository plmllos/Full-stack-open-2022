const { test, after, describe, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test.helper");

const api = supertest(app);

describe("Blogs saved initially", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("Blogs have id property", async () => {
    const blogs = await helper.blogsInDb();
    console.log(blogs);

    blogs.forEach((blog) => {
      assert.strictEqual(blog.hasOwnProperty("id"), true);
    });
  });
  describe("addition of a new blog", () => {
    test("succeeds with valid data", async () => {
      const newBlog = {
        author: "Mirko Markovic",
        url: "www.blog.com2233",
        likes: 23,
        id: "fssf34fg354g45g54gg4g",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
