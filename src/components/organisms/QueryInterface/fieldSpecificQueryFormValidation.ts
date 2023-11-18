import { type Field } from "@main/types";
import * as z from "zod";

export const LogRootProperties = [
  "level",
  "message",
  "resourceId",
  "timestamp",
  "traceId",
  "spanId",
  "commit",
  "metadata",
];

export function createFieldSpecificQueryFormValidator(
  selectedFields: Field[],
  { useDateRange }: { useDateRange: boolean },
) {
  const schemaObject: Record<string, z.ZodDate | z.ZodString> = {};

  selectedFields.forEach((field) => {
    if (field.id === "timestamp") {
      if (useDateRange) {
        schemaObject.min_timestamp = z.date({
          required_error: `Please enter a value for min timestamp.`,
        });
        schemaObject.max_timestamp = z.date({
          required_error: `Please enter a value for max timestamp.`,
        });
      } else {
        schemaObject.timestamp = z.date({
          required_error: `Please enter a value for ${field.label} or deselect it.`,
        });
      }
    } else {
      schemaObject[field.id] = z.string({
        required_error: `Please enter a value for ${field.label} or deselect it.`,
      });
    }
  });

  const schema = z.object(schemaObject);

  return schema;
}
