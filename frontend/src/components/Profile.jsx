import { Alert, Button, TextInput, Modal } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { startUpdate, updateSuccess, updateFailure, startDelete, deleteFailure, deleteSuccess, signoutSuccess } from "../app/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);
  const [uploadImage, setUploadImage] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState(null);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [uploadingError, setUploadingError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(null);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();

  const onUploadImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUploadImage(file);
      setUploadImageUrl(URL.createObjectURL(file));
    }
  };

  const onChangeImage = async () => {
    //     service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setUploading(true);
    setUploadingError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + uploadImage.name;
    const storageRef = ref(storage, fileName);
    const upload = uploadBytesResumable(storageRef, uploadImage);

    upload.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadingProgress(progress.toFixed(0));
      },
      (err) => {
        setUploadingError("Nie udało się zapisać zdjęcia (Plik musi być formatu odpowiedniego dla zdjęcia i mniejszy niż 2MB)");
        setUploadingProgress(0);
        setUploadImage(null);
        setUploadImageUrl(null);
        setUploading(false);
      },
      () => {
        getDownloadURL(upload.snapshot.ref).then((url) => {
          setUploadImageUrl(url);
          setFormData({ ...formData, picture: url });
          setUploading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (uploadImage) {
      onChangeImage();
    }
  }, [uploadImage]);

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("Nie wprowadzono żadnych zmian.");
      return;
    }

    if (uploading) {
      setUpdateUserError("Zaczekaj na załadowanie zdjęcia.");
      return;
    }

    try {
      dispatch(startUpdate());

      const response = await fetch(`api/user/update/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        dispatch(updateSuccess(responseData));
        setUpdateUserSuccess("Pomyślnie zaaktualizowno dane użytkownika.");
      } else {
        dispatch(updateFailure(responseData.errMessage));
        setUpdateUserError(responseData.errMessage);
      }
    } catch (err) {
      dispatch(updateFailure(err.errMessage));
      setUpdateUserError(err.errMessage);
    }
  };

  const handleConfirmDeleteUser = async () => {
    setShowDeleteUserModal(false);

    try {
      dispatch(startDelete());
      const response = await fetch(`api/user/delete/${user._id}`, {
        method: "DELETE",
      });

      const responseData = await response.json();

      if (response.ok) {
        dispatch(deleteSuccess(responseData));
      } else {
        dispatch(deleteFailure(responseData.message));
      }
    } catch (err) {
      dispatch(deleteFailure(err.errMessage));
    }
  };

  const handleSignout = async () => {
    try {
      const response = await fetch("api/auth/signout", {
        method: "POST",
      });

      const responseData = await response.json();

      if (response.ok) {
        dispatch(signoutSuccess());
      } else {
        console.log(responseData.message);
      }
    } catch (err) {
      console.log(err.errMessage);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profil</h1>
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col gap-4 items-center"
      >
        <input
          type="file"
          accept="image/*"
          onChange={onUploadImage}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          {uploadingProgress === 0 ? null : (
            <CircularProgressbar
              value={uploadingProgress || 0}
              text={`${uploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${uploadingProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={uploadImageUrl || user.picture}
            alt="User picture"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${uploadingProgress && uploadingProgress < 100 && "opacity-60"}`}
          />
        </div>
        {uploadingError && <Alert color="failure">{uploadingError}</Alert>}
        <TextInput
          type="email"
          id="eamil"
          placeholder="Email"
          defaultValue={user.email}
          className="w-full"
          onChange={handleChangeInput}
        />
        <TextInput
          type="text"
          id="username"
          placeholder="Nazwa użytkownika"
          defaultValue={user.username}
          className="w-full"
          onChange={handleChangeInput}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Hasło"
          className="w-full"
          onChange={handleChangeInput}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          className="max-w-40 justify-self-center"
          outline
        >
          Zaaktualizuj dane
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-10">
        <button
          className="bg-transparent"
          onClick={() => setShowDeleteUserModal(true)}
        >
          Usuń konto
        </button>
        <button
          onClick={handleSignout}
          className="bg-transparent"
        >
          Wyloguj się
        </button>
      </div>
      {updateUserSuccess && (
        <Alert
          color="success"
          className="mt-5"
          onDismiss={() => setUpdateUserSuccess(null)}
        >
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert
          color="failure"
          className="mt-5"
          onDismiss={() => setUpdateUserError(null)}
        >
          {updateUserError}
        </Alert>
      )}
      <Modal
        show={showDeleteUserModal}
        size="md"
        onClose={() => setShowDeleteUserModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Czy jesteś pewien, że chcesz usunąć tego użytkownika?</h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={handleConfirmDeleteUser}
              >
                Tak
              </Button>
              <Button
                color="gray"
                onClick={() => setShowDeleteUserModal(false)}
              >
                Nie
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* {error && (
        <Alert
          color="failure"
          className="mt-5"
          onDismiss={() => setUpdateUserError(null)}
        >
          {error}
        </Alert>
      )} */}
    </div>
  );
}
