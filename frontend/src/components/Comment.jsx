import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/pl";

export default function Comment({ comment }) {
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
      </div>
    </div>
  );
}
