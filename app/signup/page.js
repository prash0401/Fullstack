"use client";
import { useFormState } from "react-dom";
import { signUpAction } from "../actions/auth-action";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [formState, signUpFormAction] = useFormState(signUpAction, {});

  if (formState.success) {
    router.push("/login");
  }

  return (
    <>
      <h1>SignUp page</h1>
      <form action={signUpFormAction}>
        <input type="text" name="name" id="name" placeholder="enter the name" />
        <br /> <br />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="enter the email"
        />
        <br /> <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="enter the password"
        />
        <br /> <br />
        <button>Sign Up</button>
      </form>
    </>
  );
}
