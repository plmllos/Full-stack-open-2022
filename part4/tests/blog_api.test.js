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

  describe("deleting a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const [blogToDelete] = await helper.blogsInDb();

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
      assert(!blogsAtEnd.some((blog) => blog.id === blogToDelete.id));
    });
  });

  describe("Updating a blog", () => {
    test("updates the likes of a blog", async () => {
      const [blogToUpdate] = await helper.blogsInDb();

      const updatedLikes = { likes: blogToUpdate.likes + 1 };

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedLikes)
        .expect(200);

      assert.strictEqual(response.body.likes, updatedLikes.likes);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
