import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "../css/post.css";

const Post = ({ _id, title, summary, content, image, author, createdAt }) => {
  // console.log(author.username);
  return (
    <>
      <div key={_id} className="blog-post">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
          <img
            src={`${process.env.REACT_APP_API}/api/blog/blog-image/${_id}`}
            alt="blog pic"
          />
          <h5>{summary}</h5>
          <strong>Author: </strong>
          {author.username}
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </Link>
      </div>
    </>
  );
};

export default Post;
