import { Button, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function CommentSection({ postId }) {
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

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
        toast.success("Pomyślnie dodano komentarz");
      } else {
        toast.error("Nie udało się dodać komentarza");
      }
    } catch (err) {
      console.log(err);
      toast.error("Nie udało się dodać komentarza");
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
    </div>
  );
}
