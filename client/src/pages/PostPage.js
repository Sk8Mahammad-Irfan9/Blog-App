import { formatISO9075 } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/postPage.css";

const PostPage = () => {
  document.title = "Blog";
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/blog/blog/${id}`).then(
      (response) => {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      }
    );
  }, []);

  if (!postInfo) {
    return "";
  }

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

  const userId = loggedInUser();

  return (
    <>
      <div className="blog-post">
        <h1 className="post-title">{postInfo.title}</h1>
        <time className="post-date">
          {formatISO9075(new Date(postInfo.createdAt))}
        </time>
        <div className="post-author">by, {postInfo.author.username}</div>
        {userId === postInfo.author._id && (
          <>
            <div className="edit-container">
              <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                Edit This Content
              </Link>
            </div>
          </>
        )}
        <div className="post-image-container">
          <img
            src={`${process.env.REACT_APP_API}/api/blog/blog-image/${postInfo._id}`}
            alt="Blog post"
            className="post-image"
          />
        </div>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </div>
    </>
  );
};

export default PostPage;
