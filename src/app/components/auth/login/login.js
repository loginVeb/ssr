import { redirect } from "next/navigation";


async function login(formData) {

  "use server";
  const { title, body } = Object.fromEntries(formData);

  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname, password, id: 1 }),
  });

  const post = await response.json();
  // return post;
  redirect(`/posts/${post.id}`);
}


export default function Login() {
  return (
    <form action={login} className="form">
      <input type="text" placeholder="nickname" required name="nickname" autoComplete="username" />
      <input type="password" placeholder="password" required name="password" autoComplete="current-password" />
      <div>
        <input type="submit" value="Login" />
      </div>
    </form>
  );
}
