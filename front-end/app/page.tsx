import { currentUser } from "@clerk/nextjs/server";
export default async function Home() {
  const res = await fetch(`${process.env.BACKEND_URL}/user`);
  const data = await res.json();
  // console.log("data :", data);
  return <div>Hello Iam Home </div>;
}
