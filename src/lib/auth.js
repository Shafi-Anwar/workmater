import { getSession } from "next-auth/react";

export async function getUserSession(req) {
  const session = await getSession({ req });
  return session;
}
