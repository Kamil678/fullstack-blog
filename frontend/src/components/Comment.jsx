import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/pl";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit }) {
  const { user } = useSelector((state) => state.user);
  const [commentUser, setCommentUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedCommentContent, setEditedCommentContent] = useState(
    comment.content
  );

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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedCommentContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/edit/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedCommentContent }),
      });

      if (res.ok) {
        console.log(editedCommentContent);
        onEdit(comment, editedCommentContent);
        setIsEditing(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

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
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              maxLength="300"
              value={editedCommentContent}
              onChange={(e) => setEditedCommentContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-sm">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="cyanToBlue"
                onClick={handleSave}
              >
                Zapisz
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="cyanToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Anuluj
              </Button>
            </div>
          </>
        ) : (
          <>
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
              {user && user._id === comment.userId && (
                <button
                  type="button"
                  className="text-gray-400 hover:text-blue-500"
                  onClick={handleEdit}
                >
                  Edytuj
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
