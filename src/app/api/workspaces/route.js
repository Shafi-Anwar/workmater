import { NextResponse } from "next/server";
import Workspace from "@/models/Workspace";
import connectToDatabase from "@/lib/mongodb";

// Handle POST request to create a new workspace
export async function POST(request) {
  await connectToDatabase();

  try {
    const body = await request.json();
    const { name, userId } = body;

    if (!name || !userId) {
      return NextResponse.json(
        { error: "Name and userId are required" },
        { status: 400 }
      );
    }

    const newWorkspace = new Workspace({ name, userId });
    await newWorkspace.save();

    return NextResponse.json(newWorkspace, { status: 201 });
  } catch (error) {
    console.error("Failed to create workspace:", error); // Log the error
    return NextResponse.json(
      { error: "Failed to create workspace" },
      { status: 500 }
    );
  }
}

// Handle GET request to fetch all workspaces
export async function GET() {
  await connectToDatabase();

  try {
    const workspaces = await Workspace.find();
    return NextResponse.json(workspaces, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch workspaces:", error);
    return NextResponse.json(
      { error: "Failed to fetch workspaces" },
      { status: 500 }
    );
  }
}
