import React, { useEffect, useState } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
export default function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("posts/timeline/6792270873e98779c51f82b4");
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (currentUserId, post_id) => {
    try {
      const res = await axios.put(`posts/${post_id}/like`, {
        userId: currentUserId,
      });

      //set like/unlike count
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === post_id) {
            const isLiked = post.likes.includes(currentUserId);
            return {
              ...post,
              likes: isLiked
                ? post.likes.filter((id) => id !== currentUserId) // Unlike
                : [...post.likes, currentUserId], // Like
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} onLike={handleLike} />
        ))}
      </div>
    </div>
  );
}
