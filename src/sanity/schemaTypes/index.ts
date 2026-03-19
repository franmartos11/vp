import type { SchemaTypeDefinition } from "sanity";
import { projectSchema } from "./project";
import { serviceSchema } from "./service";
import { teamMemberSchema } from "./teamMember";
import { siteSettingsSchema } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  projectSchema,
  serviceSchema,
  teamMemberSchema,
  siteSettingsSchema,
];
