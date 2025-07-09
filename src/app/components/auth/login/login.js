import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";
import { readFileSync } from "fs";
import path from "path";

const dbPath = path.resolve("./src/server/db.json");

async function login(formData) {
  "use server";
  const { nickname, password } = Object.fromEntries(formData);

  const db = JSON.parse(readFileSync(dbPath, "utf-8"));
  const user = db.users.find(
    (u) => u.nickname === nickname && u.password === password
  );

  if (!user) {
    redirect("/?error=not_found");
  }

  redirect("/user");
}

export default async function Login({ searchParams }) {
  const params = await searchParams;
  const error = params?.error;

  return (
    <div className={styles.container}>
      <form action={login} className={styles.form}>
        {error === "not_found" && (
          <div className={styles.errorMessage}>Таких данных нет</div>
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
