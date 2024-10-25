import { useRouter } from "next/router";

export async function signUpAction(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch("http://localhost:8000/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log("Successfully signed up");
    return { ...prevState, success: true };
  } else {
    console.log("Failed to sign up");
  }
}

export async function loginAction(prevState, loginFormData) {
  const email = loginFormData.get("email");
  const password = loginFormData.get("password");
  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log("Successfully logged in");
    return { ...prevState, success: true };
  }
}
