// models/Workspace.js
import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
});

const Workspace =
  mongoose.models.Workspace || mongoose.model("Workspace", workspaceSchema);

export default Workspace;
