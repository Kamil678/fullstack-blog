import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";

export default function Posts() {
  const { user } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await fetch(`api/post/getposts?userId=${user._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    if (user.isAdmin) {
      fetchAllPosts();
    }
  }, [user._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;

    try {
      const res = await fetch(
        `api/post/getposts?userId=${user._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleConfirmDeletePost = async () => {
    try {
      const res = await fetch(`api/post/delete/${postIdToDelete}/${user._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
        setShowDeleteModal(false);
        toast.success(data);
      } else {
        console.log(data.message);
        toast.error("Nie udało sie usunąć posta.");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="table-auto md:mx-auto overflow-x-scroll lg:overflow-x-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {user.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md  ">
            <Table.Head>
              <Table.HeadCell>Data</Table.HeadCell>
              <Table.HeadCell>Zdjęcie</Table.HeadCell>
              <Table.HeadCell>Tutył</Table.HeadCell>
              <Table.HeadCell>Kategoria</Table.HeadCell>
              <Table.HeadCell>Usuń</Table.HeadCell>
              <Table.HeadCell>
                <span>Edytuj</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className="divide-y" key={post._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.tittle}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/post/${post.slug}`}
                      className="font-medium text-gray-900 dark:text-white"
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowDeleteModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Usuń
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/edit-post/${post._id}`}
                      className="text-teal-500 hover:underline"
                    >
                      <span>Edytuj</span>
                    </Link>
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
        <p>Nie masz jeszcze postów.</p>
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
              Czy jesteś pewien, że chcesz usunąć ten post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleConfirmDeletePost}>
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
