import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/pl";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Comment({ comment, onLike }) {
  const { user } = useSelector((state) => state.user);
  const [commentUser, setCommentUser] = useState({});
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        if (res.ok) {
          const data = await res.json();
          setCommentUser(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getUserData();
  }, [comment]);
  return (
    <div className="flex items-center p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={commentUser.picture}
          alt={commentUser.username}
          className="w-10 h-10 rounded-full bg-gray-300"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-sm truncate">
            {commentUser ? `${commentUser.username}` : "Anomimowy użytkownik"}
          </span>
          <span className="text-gray-500 text-sm">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
        <div className="flex items-center gap-2 pt-2 text-sm border-t dark:border-gray-600 max-w-fit">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 ${
              user && comment.likes.includes(user._id) && "!text-blue-500"
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">
            {comment.numberOfLikes > 0 &&
              `Liczba lajków: ${comment.numberOfLikes}`}
          </p>
        </div>
      </div>
    </div>
  );
}
