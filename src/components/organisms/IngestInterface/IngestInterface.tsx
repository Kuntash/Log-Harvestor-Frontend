import { Button } from "@main/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@main/components/ui/form";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  IngestLogFormValidation,
  type IngestLogFormSchema,
} from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@main/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { type LogPostSchema } from "@main/types";
import { useCreateLogMutation } from "@main/hooks/mutations/useCreateLogMutation";
import { useToast } from "@main/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { type AxiosError } from "axios";

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
  const { toast } = useToast();
  const createLogMutation = useCreateLogMutation();
  const form = useForm<IngestLogFormSchema>({
    resolver: zodResolver(IngestLogFormValidation),
    defaultValues: {
      log: "",
    },
  });

  const onSubmit = (formData: IngestLogFormSchema) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    if (!auth?.user?.id) {
      toast({
        variant: "destructive",
        description: "User id not found",
      });
      return;
    }
    const objectLog = JSON.parse(formData?.log) as LogPostSchema;
    const payload = {
      userId: auth?.user?.id,
      ...objectLog,
    };
    createLogMutation.mutate(payload, {
      onSuccess: () => {
        toast({
          description: "Successfully ingested the log",
        });
        form.setValue("log", "");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        toast({
          variant: "destructive",
          description: error?.response?.data?.message as string,
        });
      },
    });

    /* Mutation to post ingest logs */
  };

  return (
    <div className="flex flex-col items-center gap-y-4 py-3">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="log"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Log data</FormLabel>
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
          <Button
            className="mt-2 w-full"
            type="submit"
            disabled={createLogMutation?.isLoading as boolean}
          >
            {createLogMutation?.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting
              </>
            ) : (
              "Post"
            )}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
