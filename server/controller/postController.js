const PostModel = require("../models/Post");
const path = require("path");
const fs = require("fs");
const { setCache, getCache } = require("../cache");

exports.createPostController = async (req, res) => {
  try {
    const { title, summary, content } = req.fields;
    const { image } = req.files;
    switch (true) {
      case !title || !summary || !content || !image:
        return res.status(200).send({ error: "All fields are required" });

      case image && image.size > 5000000:
        return res
          .status(200)
          .send({ error: "Photo is required less than 5mb" });
    }

    const post = new PostModel({ ...req.fields, author: req.user._id });
    if (image) {
      post.image.data = fs.readFileSync(image.path);
      post.image.contentType = image.type;
    }

    await post.save();
    res.status(201).send({
      success: true,
      message: "post create successfully",
      post,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Unable to create post",
      error,
    });
  }
};

exports.allPostController = async (req, res) => {
  const cacheKey = "allPosts";
  const cacheTTL = 30; // Cache TTL in seconds (1 hour)

  try {
    // Check the cache first
    const cachedPosts = getCache(cacheKey);
    if (cachedPosts) {
      // Cache hit
      // console.log("Cache hit");
      return res.status(200).send({
        count: cachedPosts.length,
        success: true,
        message: "All posts",
        posts: cachedPosts,
      });
    }

    // Cache miss: Fetch from database
    // console.log("Cache miss");
    const posts = await PostModel.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);

    // Cache the posts
    setCache(cacheKey, posts, cacheTTL);

    // Send the response
    res.status(200).send({
      count: posts.length,
      success: true,
      message: "All posts",
      posts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Unable to get all posts",
      error,
    });
  }
};

exports.getSinglePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const postDoc = await PostModel.findById(id).populate("author", [
      "username",
    ]);
    res.json(postDoc);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Unable to get one post",
      error,
    });
  }
};

exports.getPostAuthorController = async (req, res) => {
  try {
    const { id } = req.params;
    const postDoc = await PostModel.findById(id).populate("author", [
      "username",
    ]);
    res.json(postDoc);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "unable to get author name",
      error,
    });
  }
};

exports.getPostImageController = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id).select("image");
    if (post.image.data) {
      res.set("Content-type", post.image.contentType);
      return res.status(200).send(post.image.data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Unable to get photo",
      err,
    });
  }
};

exports.updatePostController = async (req, res) => {
  try {
    const { title, summary, content } = req.fields;
    const { image } = req.files;

    switch (true) {
      case !title || !summary || !content:
        return res
          .status(500)
          .send({ error: "All fields are required for update" });

      case image && image.size > 1000000:
        return res
          .status(500)
          .send({ error: "Image is required less than 10mb" });
    }

    const post = await PostModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
      },
      { new: true }
    );

    if (image) {
      post.image.data = fs.readFileSync(image.path);
      post.image.contentType = image.type;
    }

    await post.save();
    res.status(201).send({
      success: true,
      message: "post update successfully",
      post,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Unable to update post",
      error,
    });
  }
};

exports.deletePostController = async (req, res) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Unable to delete this blog",
      error,
    });
  }
};

exports.myPostController = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Unable to get your blogs",
      error,
    });
  }
};

exports.testPostController = (req, res) => {
  res.send("Hello protected");
};
