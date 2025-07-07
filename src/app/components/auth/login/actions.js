// src/app/components/auth/login/actions.js
"use server";

export async function login(formData) {
  const nickname = formData.get("nickname");
  const password = formData.get("password");

  // Проверка на пустые поля
  if (!nickname || !password) {
    throw new Error("Заполните все поля");
  }

  // Имитация проверки в базе данных
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Проверка учетных данных
  if (nickname !== "admin" || password !== "123456") {
    throw new Error("Неверный никнейм или пароль");
  }

  return { success: true };
}
