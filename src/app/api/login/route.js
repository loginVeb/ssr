import { NextResponse } from 'next/server';

export async function POST(request) {
  const data = await request.formData();
  const nickname = data.get('nickname');
  const password = data.get('password');

  if (!nickname || !password) {
    return NextResponse.json({ error: 'Заполните все поля' }, { status: 400 });
  }

  // Имитация проверки в базе данных
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (nickname !== 'admin' || password !== '123456') {
    return NextResponse.json({ error: 'Неверный никнейм или пароль' }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
