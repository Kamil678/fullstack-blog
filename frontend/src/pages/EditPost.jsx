import React, { useEffect, useState } from "react";
import { TextInput, Select, FileInput, Button } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function EditPost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const { user } = useSelector((state) => state.user);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (res.ok) {
          setFormData(data.posts[0]);
        } else {
          console.log(data.message);
          toast.error("Wystąpił problem z pobraniem posta.");
          return;
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPost();
  }, [postId]);

  const clickUploadImage = async () => {
    try {
      if (!file) {
        toast.error("Brak zdjęcia!", {
          position: "top-right",
        });
        return;
      }

      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const upload = uploadBytesResumable(storageRef, file);

      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          toast.error("Nie udało się dodać zdjęcia", {
            position: "top-right",
          });
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(upload.snapshot.ref).then((url) => {
            setImageUploadProgress(null);
            setFormData({ ...formData, image: url });
            toast.success("Dodano zdjęcie", {
              position: "top-right",
            });
          });
        }
      );
    } catch (err) {
      setImageUploadProgress(null);
      toast.error("Błąd podczas dodawania zdjęcia", {
        position: "top-right",
      });
      console.log(err);
    }
  };

  const submitEditPost = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/post/edit/${formData._id}/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error("Błąd podczas edytowania posta", {
          position: "top-right",
        });
        console.log(data.message);
        return;
      } else {
        console;
        navigate(`/post/${data._id}`);
      }

      if (!data.success) {
        toast.error(data.message, {
          position: "top-right",
        });
        return;
      }
    } catch (err) {
      toast.error("Błąd podczas edytowania posta", {
        position: "top-right",
      });
      console.log(err.message);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="my-7 text-center font-semibold text-3xl">Edytuj post</h1>
      <form
        className="flex flex-col gap-4 items-center w-full"
        onSubmit={submitEditPost}
      >
        <TextInput
          type="text"
          id="title"
          placeholder="Tytuł"
          required
          className="w-full"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Select
          className="w-full"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="uncategorized">Wybierz kategorię</option>
          <option value="javascript">JavaScript</option>
          <option value="vue">Vue</option>
          <option value="php">PHP</option>
          <option value="react">React</option>
          <option value="nodejs">Node.js</option>
        </Select>
        <div className="w-full flex gap-4 items-center justify-between border-teal-500 border-dashed p-3 border-2">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={clickUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-8 h-8">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0} %`}
                />
              </div>
            ) : (
              "Dodaj zdjęcie"
            )}
          </Button>
        </div>
        {formData.image && (
          <img
            src={formData.image}
            alt="Upload image"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          required
          placeholder="Wpisz tekst..."
          className="w-full h-72 mb-12"
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit" size="lg" gradientDuoTone="purpleToBlue">
          Edytuj
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}
