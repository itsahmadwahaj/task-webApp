import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";

const taskSchemaLiteral = {
  title: "task schema",
  description: "describes a task",
  version: 1,
  type: "object",
  primaryKey: "id",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    name: {
      type: "string",
      maxLength: 300,
    },
    description: {
      type: "string",
      maxLength: 3000,
    },
    status: {
      type: "string",
      enum: ["blocked", "pending", "in progress", "completed"],
    },
    checklists: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
            maxLength: 300,
          },
          description: {
            type: "string",
            maxLength: 3000,
          },
          status: {
            type: "string",
            enum: ["blocked", "pending", "in progress", "completed"],
          },
          items: {
            type: "array",
            items: {
              type: "object",
              required: ["name"],
              properties: {
                name: {
                  type: "string",
                  maxLength: 300,
                },
                description: {
                  type: "string",
                  maxLength: 3000,
                },
                status: {
                  type: "string",
                  enum: ["blocked", "pending", "in progress", "completed"],
                },
              },
            },
          },
        },
      },
    },
    createdAt: {
      type: "string",
      format: "date-time",
      maxLength: 300,
    },
    updatedAt: {
      type: "string",
      format: "date-time",
    },
  },
  required: ["id", "name", "status", "checklists", "createdAt"],
  indexes: ["createdAt"],
} as const;

const schemaTyped = toTypedRxJsonSchema(taskSchemaLiteral);

export type TaskDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;

export const taskSchema: RxJsonSchema<TaskDocType> = taskSchemaLiteral;
