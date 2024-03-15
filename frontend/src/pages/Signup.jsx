import React from "react";
import Logo from "../components/Logo";
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen mt-20">
      <div className="max-w-7xl p-3 mx-auto flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Logo textSize="text-4xl" />
          <p className="text-sm mt-5">Stwórz swoje konto za pomocą emaila i hasła lub zaloguj się poprzez Google.</p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-3">
            <div>
              <Label value="Email" />
              <TextInput
                type="text"
                placeholder="Wpisz email"
                id="email"
              />
            </div>
            <div>
              <Label value="Nazwa użytkownika" />
              <TextInput
                type="text"
                placeholder="Wpisz nazwę użytkownika"
                id="username"
              />
            </div>
            <div>
              <Label value="Hasło" />
              <TextInput
                type="password"
                placeholder="Wpisz hasło"
                id="password"
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
            >
              Stwórz konto
            </Button>
          </form>
          <div className="flex gap-1 text-sm mt-5">
            <span>Masz już konto?</span>
            <Link
              to="/sign-in"
              className="text-blue-500"
            >
              Zaloguj się
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
