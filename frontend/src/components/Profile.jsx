import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const [uploadImage, setUploadImage] = useState(null)
  const [uploadImageUrl, setUploadImageUrl] = useState(null)

  const onUploadImage = (e) => {
    const file = e.target.files[0];

    if(file){
      setUploadImage(file)
      setUploadImageUrl(URL.createObjectURL(file))
    }
  }
 
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profil</h1>
      <form className="flex flex-col gap-4 items-center">
        <input type="file" accept="image/*" onChange={onUploadImage}/>
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={uploadImageUrl || user.picture}
            alt="User picture"
            className="rounded-full w-full h-full border-8 border-[lightgray] "
          />
        </div>
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
