"use server";

export async function login(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Пример валидации
  if (!email || !password) {
    throw new Error("Заполните все поля");
  }

  // Имитация запроса к базе данных
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Пример проверки логина
  if (email !== "admin@example.com" || password !== "123456") {
    throw new Error("Неверный email или пароль");
  }

  // Успешный вход — редирект
  return { success: true };
}