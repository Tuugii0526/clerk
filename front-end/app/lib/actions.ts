"use server";

import { currentUser } from "@clerk/nextjs/server";
export async function checkAdmin() {
  const user = await currentUser();
  const publicMetadata = user?.publicMetadata;
  if (publicMetadata) {
    const { role } = publicMetadata;
    if (role === "admin") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
