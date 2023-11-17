import { Button } from "@main/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@main/components/ui/form";
import { Input } from "@main/components/ui/input";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  IngestLogFormValidation,
  type IngestLogFormSchema,
} from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@main/components/ui/textarea";
import { useUser } from "@clerk/nextjs";

const LogPlaceholder = `{
	"level": "error",
	"message": "Failed to connect to DB",
    "resourceId": "server-1234",
	"timestamp": "2023-09-15T08:00:00Z",
	"traceId": "abc-xyz-123",
    "spanId": "span-456",
    "commit": "5e5342f",
    "metadata": {
        "parentResourceId": "server-0987"
    }
}
`;
export const IngestInterface = () => {
  const auth = useUser();
  const form = useForm<IngestLogFormSchema>({
    resolver: zodResolver(IngestLogFormValidation),
    defaultValues: {},
  });

  const onSubmit = (formData: IngestLogFormSchema) => {
    const payload = {
      userId: auth?.user?.id,
      ...formData,
    };
    console.log(
      "🚀 ~ file: IngestInterface.tsx:47 ~ onSubmit ~ payload:",
      payload,
    );

    /* Mutation to post ingest logs */
  };

  return (
    <div className="flex flex-col items-start gap-y-4 p-3">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="log"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea rows={14} placeholder={LogPlaceholder} {...field} />
                </FormControl>
                <FormDescription>
                  Your log that you wanna save in the database
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-2 w-full" type="submit">
            Post
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
