import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "tasks",
      columns: [
        { name: "name", type: "string" },
        { name: "is_completed", type: "boolean" },
        { name: "created_at", type: "number" },
      ],
    }),
  ],
});
