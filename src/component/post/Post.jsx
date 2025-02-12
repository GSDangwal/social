import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./post.css";
import axios from "axios";
import moment from "moment";

export default function Post({ post, onLike }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState("");

  //fetch the current user based on post userId
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`users/${post.userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={user.profilePicture || PF + "blank-profile-picture.png"}
              alt=""
            />
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{moment(post.createdAt).fromNow()}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="assets/like.png"
              onClick={() => onLike(user._id, post._id)}
              alt=""
            />
            <img
              className="likeIcon"
              src="assets/heart.png"
              onClick={() => onLike(user._id, post._id)}
              alt=""
            />
            <span className="postLikeCounter">
              {post.likes.length} people like it
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
