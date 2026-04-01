import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignInButton() {
  return (
    <Link to="/sign-in">
      <Button className="rounded-md px-2 md:px-4 text-sm font-semibold bg-gradient-to-r from-cyan-500  to-blue-500 text-white shadow-md shadow-cyan-500/20 hover:-translate-y-0.5 hover:shadow-cyan-500/40 transition-all duration-200 border-0 focus:ring-0">
        Zaloguj się
      </Button>
    </Link>
  );
}
