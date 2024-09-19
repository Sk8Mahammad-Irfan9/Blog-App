import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../component/Post";

const HomePage = () => {
  document.title="All blogs"
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/blog/all-blog`
        );
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => <Post {...post} key={post.id} post={post} />)
      ) : (
        <p>No posts available</p>
      )}
    </>
  );
};

export default HomePage;
