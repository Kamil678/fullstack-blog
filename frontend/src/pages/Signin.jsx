import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineEye } from "react-icons/hi2";
import AuthLayout, { Divider } from "../components/auth/AuthLayout";
import GoogleButton from "../components/auth/GoogleButton";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Field";
import Seo from "../components/ui/Seo";
import { api } from "../lib/api";
import { useErrorMessage } from "../hooks/useErrorMessage";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

export default function Signin() {
  const { t } = useTranslation();
  const errorMessage = useErrorMessage();
  const onSignedIn = useAuthRedirect();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const run = async (kind, request) => {
    setError(null);
    setLoading(kind);
    try {
      onSignedIn(await request());
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(null);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    run("form", () => api("/auth/signin", { method: "POST", body: { ...form, email: form.email.trim() } }));
  };

  const demo = () => run("demo", () => api("/auth/demo", { method: "POST" }));

  return (
    <AuthLayout
      title={t("auth.signInTitle")}
      description={t("auth.signInDescription")}
      footer={
        <>
          {t("auth.noAccount")}{" "}
          <Link to="/sign-up" className="font-medium text-gray-900 underline-offset-4 hover:underline dark:text-white">
            {t("auth.createAccount")}
          </Link>
        </>
      }
    >
      <Seo title={t("auth.signInTitle")} />
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/5">
        <p className="text-sm font-medium text-amber-900 dark:text-amber-200">{t("auth.demoTitle")}</p>
        <p className="mt-1 text-xs text-amber-800/80 dark:text-amber-200/70">{t("auth.demoDescription")}</p>
        <Button size="sm" variant="secondary" className="mt-3" onClick={demo} loading={loading === "demo"}>
          {loading !== "demo" && <HiOutlineEye className="h-4 w-4" />}
          {t("auth.demoButton")}
        </Button>
      </div>

      <Divider label={t("auth.or")} />

      <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
        <Input label={t("auth.email")} type="email" name="email" autoComplete="email" value={form.email} onChange={change} required />
        <Input
          label={t("auth.password")}
          type="password"
          name="password"
          autoComplete="current-password"
          value={form.password}
          onChange={change}
          required
        />
        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </p>
        )}
        <Button type="submit" className="w-full" loading={loading === "form"} disabled={!form.email || !form.password}>
          {t("auth.signIn")}
        </Button>
        <GoogleButton onSuccess={onSignedIn} />
      </form>
    </AuthLayout>
  );
}
