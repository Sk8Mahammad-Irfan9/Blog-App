import React, { useEffect, useState } from "react";
import Editor from "../component/Editor";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/createPost.css";
import { toast } from "react-toastify";
import Post from "../component/Post";

const CreateBlog = () => {
  document.title = "Create blog";
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [myPost, setMyPost] = useState([]);
  const navigate = useNavigate();

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const blogData = new FormData();
      blogData.append("title", title);
      blogData.append("summary", summary);
      blogData.append("content", content);
      blogData.append("image", image);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/blog/create-blog`,
        blogData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/");
      } else {
        toast.error(data?.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/blog/all-blog`
        );
        setMyPost(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const loggedInUser = () => {
    const authString = localStorage.getItem("auth");

    if (authString) {
      try {
        const authObject = JSON.parse(authString);
        if (authObject && authObject.user && authObject.user._id) {
          return authObject.user._id;
        } else {
          console.warn("User ID not found in auth object.");
          return null;
        }
      } catch (e) {
        console.error("Failed to parse auth object:", e);
        return null;
      }
    } else {
      console.warn("No authentication data found in localStorage.");
      return null;
    }
  };

  // const authorId=(myPost.map((post) => post.author._id));
  const authorId = loggedInUser();
  const userPosts = myPost.filter((post) => post.author._id === authorId);

  return (
    <>
      <div className="blog-form">
        <div className="image-upload">
          <label className="image-upload-label">
            {image ? image.name : "Upload image"}
            <input
              type="file"
              name="image"
              accept="image/*"
              className="image-upload-input"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </label>
        </div>
        <div className="image-preview">
          {image && (
            <img
              className="image-preview-img"
              src={URL.createObjectURL(image)}
              alt="blog_image"
            />
          )}
        </div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
          required
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="summary-input"
          required
        />
        <Editor value={content} onChange={setContent} className="editor" />
        <div className="submit-button">
          <button onClick={handleCreateBlog} className="create-blog-btn">
            Create blog
          </button>
        </div>
      </div>
      <div className="my-posts">
        <h3>My posts</h3>
        {userPosts.length > 0 ? (
          userPosts.map((post) => <Post {...post} key={post.id} />)
        ) : (
          <p>No posts found!</p>
        )}
      </div>
    </>
  );
};

export default CreateBlog;
