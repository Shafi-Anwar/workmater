// app/api/users/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, name, plan = "FREE" } = await request.json();

    // Check for required fields
    if (!email || !name) {
      return new Response(
        JSON.stringify({ error: "Email and name are required" }),
        { status: 400 }
      );
    }

    // Validate plan value
    const validPlans = ["FREE", "PREMIUM"];
    if (!validPlans.includes(plan)) {
      return new Response(JSON.stringify({ error: "Invalid plan value" }), {
        status: 400,
      });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User with this email already exists" }),
        { status: 400 }
      );
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: { email, name, plan },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
