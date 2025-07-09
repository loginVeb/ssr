import styles from "./registration.module.css";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { redirect } from "next/navigation";

const SECRET_KEY = "your_secret_key"; // В реальном проекте хранить в env
const dbPath = path.resolve("./src/server/db.json");

async function registerUser(formData) {
  "use server";
  const { nickname, password, confirmPassword } = Object.fromEntries(formData);

  if (password !== confirmPassword) {
    throw new Error("Пароли не совпадают");
  }

  const db = JSON.parse(readFileSync(dbPath, "utf-8"));
  const existingUser = db.users.find((u) => u.nickname === nickname);

  if (existingUser) {
    throw new Error("Такой ник уже есть");
  }

  const newUser = {
    id: Date.now().toString(),
    nickname,
    password,
  };

  db.users.push(newUser);
  writeFileSync(dbPath, JSON.stringify(db, null, 2));

  const token = jwt.sign({ id: newUser.id, nickname: newUser.nickname }, SECRET_KEY, {
    expiresIn: "1h",
  });

  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
  });

  redirect("/user");
}

export default async function Registration() {
  return (
    <div className={styles.container}>
      <form action={registerUser} className={styles.form}>
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
        <input
          type="password"
          placeholder="confirm password"
          required
          name="confirmPassword"
          autoComplete="current-password"
          className={styles.inputPassword}
        />
        <button type="submit" className={styles.button}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
