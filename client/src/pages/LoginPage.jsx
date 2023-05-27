import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      const {data} = await axios.post("/login", { email, password });
      setUser(data)
      alert("login successful");
      setRedirect(true);
    } catch (error) {
      alert("login failed");
    }
  }

  if (redirect) {
    return <Navigate to={'/'} /> 
  }

  return (
    <div className="mt-4 grow flex flex-col justify-center mb-16">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
        <input
          type="email"
          placeholder={"your@email.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="primary">Login</button>
        <div className="text-center py-2 text-gray-500">
          Don&apos;t have an account yet? &nbsp;
          <Link to={"/register"} className="underline text-black">
            Register now
          </Link>
        </div>
      </form>
    </div>
  );
}
