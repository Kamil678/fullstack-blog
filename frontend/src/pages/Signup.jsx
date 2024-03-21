import React, { useState } from "react";
import Logo from "../components/Logo";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errMessage, setErrMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const getError = (message) => {
    if (message.includes("duplicate key error collection")) {
      return "Użytkownik z takim emeilem lub nazwą już istnieje.";
    } else {
      return "Coś poszło nie tak, spróbuj ponownie.";
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.username || !formData.password) {
      return setErrMessage("Proszę uzupełnić wszystkie wymagane pola.");
    }

    try {
      setLoading(true);
      setErrMessage(null);

      const response = await fetch("api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        setLoading(false);
        return setErrMessage(getError(data.errMessage));
      }
      setLoading(false);

      if (response.ok) {
        navigate("/sign-in");
      }
    } catch (err) {
      setErrMessage(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-60">
      <div className="max-w-7xl p-3 mx-auto flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Logo textSize="text-4xl" />
          <p className="text-sm mt-5">Stwórz swoje konto za pomocą emaila i hasła lub zaloguj się poprzez Google.</p>
        </div>
        <div className="flex-1">
          <form
            className="flex flex-col gap-3"
            onSubmit={submitForm}
          >
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="Wpisz email"
                id="email"
                onChange={changeInput}
              />
            </div>
            <div>
              <Label value="Nazwa użytkownika" />
              <TextInput
                type="text"
                placeholder="Wpisz nazwę użytkownika"
                id="username"
                onChange={changeInput}
              />
            </div>
            <div>
              <Label value="Hasło" />
              <TextInput
                type="password"
                placeholder="Wpisz hasło"
                id="password"
                onChange={changeInput}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Zapisywanie...</span>
                </>
              ) : (
                "Stwórz konto"
              )}
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
          {errMessage && (
            <Alert
              className="mt-5"
              color="failure"
            >
              {errMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
