"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./registration.module.css";

async function registerUser(formData) {
  const { nickname, password, confirmPassword } = Object.fromEntries(formData);

  if (password !== confirmPassword) {
    throw new Error("Пароли не совпадают");
  }

  // Проверка существования пользователя
  const existingUserResponse = await fetch(
    "http://localhost:3001/users?nickname=" + encodeURIComponent(nickname)
  );
  const existingUsers = await existingUserResponse.json();

  if (existingUsers.length > 0) {
    throw new Error("Такой ник уже есть");
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
}

export default function Registration() {
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.target);

    try {
      await registerUser(formData);
      router.push("/user");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.errorMessage}>{error}</div>}
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
