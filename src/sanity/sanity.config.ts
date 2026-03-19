import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { projectId, dataset, apiVersion } from "./lib/client";

export default defineConfig({
  name: "default",
  title: "Architecture Studio CMS",
  projectId,
  dataset,
  apiVersion,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
