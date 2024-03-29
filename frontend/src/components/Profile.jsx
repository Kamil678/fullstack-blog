import { Alert, Button, TextInput } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const [uploadImage, setUploadImage] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState(null);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [uploadingError, setUploadingError] = useState(null);
  console.log(uploadingProgress, uploadingError);
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
      },
      () => {
        getDownloadURL(upload.snapshot.ref).then((url) => {
          setUploadImageUrl(url);
        });
      }
    );
  };

  useEffect(() => {
    if (uploadImage) {
      onChangeImage();
    }
  }, [uploadImage]);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profil</h1>
      <form className="flex flex-col gap-4 items-center">
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
        />
        <TextInput
          type="text"
          id="username"
          placeholder="Nazwa użytkownika"
          defaultValue={user.username}
          className="w-full"
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Hasło"
          className="w-full"
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
        <button className="bg-transparent">Usuń konto</button>
        <button className="bg-transparent">Wyloguj się</button>
      </div>
    </div>
  );
}
