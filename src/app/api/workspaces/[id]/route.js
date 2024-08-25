import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function GET(req, { params }) {
  try {
    await client.connect();
    const db = client.db();
    const workspacesCollection = db.collection("workspaces");

    const workspace = await workspacesCollection.findOne({
      _id: new ObjectId(params.id),
    });

    if (!workspace) {
      return new Response(JSON.stringify({ error: "Workspace not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(workspace), { status: 200 });
  } catch (error) {
    console.error("Error fetching workspace:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch workspace" }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { name, description, automationEnabled, automationOptions } =
    await req.json();

  try {
    await client.connect();
    const db = client.db();
    const workspacesCollection = db.collection("workspaces");

    const result = await workspacesCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          description,
          automationEnabled,
          automationOptions,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Workspace not found or no changes made" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Workspace updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating workspace:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update workspace" }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await client.connect();
    const db = client.db();
    const workspacesCollection = db.collection("workspaces");

    const result = await workspacesCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Workspace not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Workspace deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting workspace:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete workspace" }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
