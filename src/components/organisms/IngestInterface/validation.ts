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

export const IngestLogFormValidation = z.object({
  log: z
    .string({
      required_error: "Please paste the log before pressing Post.",
    })
    .refine(() => {
      return true;
    }),
});

export type IngestLogFormSchema = z.infer<typeof IngestLogFormValidation>;
