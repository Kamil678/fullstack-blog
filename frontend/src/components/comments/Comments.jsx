import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";

export default function Comments() {
  const { user } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const res = await fetch("api/comment/getComments");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    if (user.isAdmin) {
      fetchAllComments();
    }
  }, [user._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;

    try {
      const res = await fetch(
        `api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleConfirmDeleteComment = async () => {
    try {
      const res = await fetch(`api/comment/delete/${commentIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowDeleteModal(false);
        toast.success(data);
      } else {
        console.log(data.message);
        toast.error("Nie udało sie usunąć komentarza.");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="table-auto md:mx-auto overflow-x-scroll lg:overflow-x-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {user.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md  ">
            <Table.Head>
              <Table.HeadCell>Data dodania</Table.HeadCell>
              <Table.HeadCell>Treść komentarza</Table.HeadCell>
              <Table.HeadCell>Liczba polubień</Table.HeadCell>
              <Table.HeadCell>ID artykułu</Table.HeadCell>
              <Table.HeadCell>ID użytkownika</Table.HeadCell>
              <Table.HeadCell>Usuń</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body className="divide-y" key={comment._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowDeleteModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Usuń
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <div>
              <button
                onClick={handleShowMore}
                className="w-full text-teal-500 self-center text-sm py-7"
              >
                Pokaż więcej
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Nie ma jeszcze żadnych komentarzy.</p>
      )}
      <Modal
        show={showDeleteModal}
        size="md"
        onClose={() => setShowDeleteModal(false)}
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
              <Button color="failure" onClick={handleConfirmDeleteComment}>
                Tak
              </Button>
              <Button color="gray" onClick={() => setShowDeleteModal(false)}>
                Nie
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
