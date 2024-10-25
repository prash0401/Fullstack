"use client";
import { useFormState } from "react-dom";
import { loginAction } from "../actions/auth-action";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const [loginFormState, loginFormAction] = useFormState(loginAction, {});
  console.log("loginFormState", loginFormState);
  if (loginFormState.success) {
    console.log("login success");
    router.push("/dashboard");
  }
  return (
    <>
      <h1>login page</h1>
      <form action={loginFormAction}>
        <input type="email" placeholder="enter email" name="email" />
        <br />
        <br />
        <input type="password" placeholder="enter password" name="password" />
        <br />
        <br />
        <button>login</button>
      </form>
    </>
  );
}
