import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../component/Editor";
import "../css/editPost.css";
import { toast } from "react-toastify";

const EditPost = () => {
  document.title = "edit blog";
  const params = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const getSingleBlog = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/blog/blog/${params.id}`
      );
      setTitle(data.title);
      setSummary(data.summary);
      setContent(data.content);
      setId(data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      let answer = window.prompt("Are you want to delete this product? (y/n)");
      if (!answer) return;
      await axios.delete(
        `${process.env.REACT_APP_API}/api/blog/delete-blog/${id}`
      );
      toast.success("Post deleted successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getSingleBlog();
  }, []);

  const handleEditBlog = async (e) => {
    e.preventDefault();
    try {
      const blogData = new FormData();
      blogData.append("title", title);
      blogData.append("summary", summary);
      blogData.append("content", content);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/blog/update-blog/${params.id}`,
        blogData
      );
      if (data?.success) {
        navigate("/");
        toast.success(data?.message);
      } else {
        toast.error(data?.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="blog-edit-form">
        <div className="image-upload-container">
          <label className="image-upload-label">
            {image ? image.name : "Upload image"}
            <input
              type="file"
              name="image"
              accept="image/*"
              className="image-upload-input"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>
        <div className="image-preview-container">
          {image ? (
            <img
              className="image-preview"
              src={URL.createObjectURL(image)}
              alt="product_photo"
            />
          ) : (
            <img
              className="image-preview"
              src={`${process.env.REACT_APP_API}/api/blog/blog-image/${params.id}`}
              alt="Blog Img"
            />
          )}
        </div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="summary-input"
        />
        <Editor value={content} onChange={setContent} className="editor" />
        <div className="button-container">
          <button onClick={handleEditBlog} className="update-post-button">
            Update Post
          </button>
        </div>
        <div className="button-container">
          <button onClick={handleDeletePost} className="delete-post-button">
            Delete Post
          </button>
        </div>
      </div>
    </>
  );
};

export default EditPost;
