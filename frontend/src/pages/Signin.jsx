import React, { useState } from "react";
import Logo from "../components/Logo";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { startSignIn, successSignIn, failureSignIn } from "../app/user/userSlice";
import GoogleAuth from "../components/GoogleAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error: errMessage} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const changeInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const getError = (message) => {
    if (message.includes("duplicate key error collection")) {
      return "Użytkownik z takim emeilem lub nazwą już istnieje.";
    } else {
      return message
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(failureSignIn("Proszę uzupełnić wszystkie wymagane pola."));
    }

    try {
      dispatch(startSignIn());

      const response = await fetch("api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        return dispatch(failureSignIn(data.errMessage));
      }
      //setLoading(false);

      if (response.ok) {
        dispatch(successSignIn(data))
        navigate("/");
      }
    } catch (err) {
      dispatch(failureSignIn(err.errMessage))
    }
  };

  return (
    <div className="min-h-screen mt-60">
      <div className="max-w-7xl p-3 mx-auto flex flex-col md:flex-row md:items-center gap-5 justify-center">
        <div className="flex-1">
          <Logo textSize="text-4xl" />
          <p className="text-sm mt-5">Zaloguj się za pomocą emaila i hasła lub poprzez Google.</p>
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
              <Label value="Hasło" />
              <TextInput
                type="password"
                placeholder="Wpisz hasło"
                id="password"
                onChange={changeInput}
              />
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Logowanie...</span>
                </>
              ) : (
                "Zaloguj się"
              )}
            </Button>
            <GoogleAuth></GoogleAuth>
          </form>
          <div className="flex gap-1 text-sm mt-5">
            <span>Nie masz jeszcze konta?</span>
            <Link
              to="/sign-up"
              className="text-blue-500"
            >
              Stwórz konto
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
