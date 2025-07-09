import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";

async function login(formData) {
  "use server";
  const { nickname, password } = Object.fromEntries(formData);

  // Проверка существования пользователя
  const existingUserResponse = await fetch(
    "http://localhost:3001/users?nickname=" + encodeURIComponent(nickname)
  );
  const existingUsers = await existingUserResponse.json();

  if (existingUsers.length > 0) {
    redirect("/?error=nickname_exists");
  }

  // Создание нового пользователя
  const createUserResponse = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nickname, password }),
  });

  if (!createUserResponse.ok) {
    throw new Error("Ошибка при создании пользователя");
  }

  redirect("/");
}

export default async function Login({ searchParams }) {
  // Асинхронно дождитесь разрешения searchParams
  const params = await searchParams;
  const error = params?.error;

  return (
    <div className={styles.container}>
      <form action={login} className={styles.form}>
        {error === "nickname_exists" && (
          <div className={styles.errorMessage}>Такой ник уже есть</div>
        )}
        <input
          type="text"
          placeholder="nickname"
          required
          name="nickname"
          autoComplete="username"
          className={styles.inputNickname}
        />
        <input
          type="password"
          placeholder="password"
          required
          name="password"
          autoComplete="current-password"
          className={styles.inputPassword}
        />
        <button type="submit" className={styles.button}>
          Войти
        </button>
        <Link href="/?mode=registration" className={styles.link}>
          Регистрация
        </Link>
      </form>
    </div>
  );
}
