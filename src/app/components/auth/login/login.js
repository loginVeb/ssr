import { redirect } from "next/navigation";
import styles from "./login.module.css";

async function login(formData) {

  "use server";
  const { nickname, password } = Object.fromEntries(formData);

  const response = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname, password }),
  });

  const post = await response.json();
   return post;
  // redirect(`/posts/${post.id}`);
}


export default function Login() {
  return (
    <form action={login} className={styles.form}>
      <input type="text" placeholder="nickname" required name="nickname" autoComplete="username" />
      <input type="password" placeholder="password" required name="password" autoComplete="current-password" />
      <div>
        <input type="submit" value="Login" />
      </div>
    </form>
  );
}
