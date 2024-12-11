import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  console.log("user is:", user);
  return <div>Hello Iam Home </div>;
}
