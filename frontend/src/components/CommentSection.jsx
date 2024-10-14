import { Button, Modal, Textarea } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comment from "./Comment";
import { FaExpeditedssl } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function CommentSection({ postId }) {
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (comment.length > 300) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment, postId, userId: user._id }),
      });
      const data = await res.json();

      if (res.ok) {
        setComment("");
        setAllComments([data.comment, ...allComments]);
        toast.success("Pomyślnie dodano komentarz");
      } else {
        toast.error("Nie udało się dodać komentarza");
      }
    } catch (err) {
      console.log(err);
      toast.error("Nie udało się dodać komentarza");
    }
  };

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setAllComments(data.comments);
        } else {
          return;
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getAllComments();
  }, [postId]);

  const handleLikeComment = async (commentId) => {
    try {
      if (!user) {
        navigate("/sign-in");
        return;
      }

      const res = await fetch(`/api/comment/like/${commentId}`, {
        method: "PUT",
      });

      if (res.ok) {
        const data = await res.json();
        setAllComments(
          allComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setAllComments(
      allComments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleConfirmDeleteComment = async (commentId) => {
    try {
      if (!user) {
        navigate("/sign-in");
        return;
      }

      const res = await fetch(`/api/comment/delete/${commentId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const data = await res.json();
        setAllComments(
          allComments.filter((comment) => comment._id !== commentId)
        );
        setShowDeleteCommentModal(false);
        toast.success(data);
      } else {
        toast.error("Nie udało się usunąć komentarza");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {user ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Zalogowany użytkownik:</p>
          <img
            src={user.picture}
            alt="Logged user picture"
            className="h-7 w-7 object-cover rounded-full"
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-xs text-cyan-600 hover:underline"
          >
            {user.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm my-5 flex items-center gap-5">
          <p>Musisz być zalogowany aby dodać komentarz</p>
          <Link to={"/sign-in"} className="">
            <Button gradientDuoTone="cyanToBlue" outline>
              Zaloguj się
            </Button>
          </Link>
        </div>
      )}
      {user && (
        <form
          className="border border-teal-500 rounded-md p-3"
          onSubmit={handleSubmitForm}
        >
          <Textarea
            placeholder="Dodaj komentarz..."
            rows="4"
            maxLength="300"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-500 text-sm">{comment.length}/300</p>
            <Button type="submit" gradientDuoTone="cyanToBlue" outline>
              Dodaj
            </Button>
          </div>
        </form>
      )}
      {allComments.length > 0 ? (
        <>
          <div className="flex items-center my-5 text-sm gap-2">
            <p>Ilość komentarzy: </p>
            <div className="border border-gray-500 py-1 px-2 rounded-md">
              <p>{allComments.length}</p>
            </div>
          </div>
          {allComments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLikeComment}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowDeleteCommentModal(true);
                setCommentIdToDelete(commentId);
              }}
            />
          ))}
        </>
      ) : (
        <div>
          <p className="text-sm my-5">
            Nie ma jeszcze komentarzy do tego posta
          </p>
        </div>
      )}
      <Modal
        show={showDeleteCommentModal}
        size="md"
        onClose={() => setShowDeleteCommentModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Czy jesteś pewien, że chcesz usunąć ten komentarz?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleConfirmDeleteComment(commentIdToDelete)}
              >
                Tak
              </Button>
              <Button
                color="gray"
                onClick={() => setShowDeleteCommentModal(false)}
              >
                Nie
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );
}
