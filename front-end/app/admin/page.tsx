import { notFound } from "next/navigation";
import { checkAdmin } from "../lib/actions";

export default async function Page() {
  const isAdmin = await checkAdmin();
  if (isAdmin) {
    return <div>Hello Iam admin</div>;
  } else {
    notFound();
  }
}
