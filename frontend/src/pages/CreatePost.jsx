import React from "react";
import { TextInput, Select, FileInput, Button } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="my-7 text-center font-semibold text-3xl">Stwórz post</h1>
      <form className="flex flex-col gap-4 items-center w-full">
        <TextInput
          type="text"
          id="title"
          placeholder="Tytuł"
          required
          className="w-full"
        />
        <Select className="w-full">
          <option value="uncategorized">Wybierz kategorię</option>
          <option value="javascript">JavaScript</option>
          <option value="vue">Vue</option>
          <option value="php">PHP</option>
          <option value="react">React</option>
          <option value="nodejs">Node.js</option>
        </Select>
        <div className="w-full flex gap-4 items-center justify-between border-teal-500 border-dashed p-3 border-2">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Dodaj zdjęcie
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          required
          placeholder="Wpisz tekst..."
          className="w-full h-72 mb-12"
        />
        <Button type="submit" size="lg" gradientDuoTone="purpleToBlue">
          Opublikuj post
        </Button>
      </form>
    </div>
  );
}
