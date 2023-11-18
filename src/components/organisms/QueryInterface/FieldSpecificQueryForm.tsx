import { type QueryResultLog, type Field } from "@main/types";
import React, { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createFieldSpecificQueryFormValidator } from "./fieldSpecificQueryFormValidation";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@main/components/ui/form";
import { Input } from "@main/components/ui/input";
import { Button } from "@main/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@main/components/ui/use-toast";
import { useGetLogsMutation } from "@main/hooks/mutations/useGetLogsMutation";
import { Switch } from "@main/components/ui/switch";
import { Label } from "@main/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@main/components/ui/popover";
import { cn } from "@main/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useSetQueryLogsAtom } from "@main/globalState/logs";
// import { Calendar } from "@main/components/ui/calendar";

type FieldSpecifcQueryFormProps = {
  selectedFields: Field[];
};

export const FieldSpecificQueryForm = (props: FieldSpecifcQueryFormProps) => {
  const { selectedFields } = props;
  const auth = useUser();
  const { toast } = useToast();
  const setQueryLogs = useSetQueryLogsAtom();
  const [useDateRange, setUseDateRange] = useState<boolean>(false);

  const fieldSpecificQueryFormValidation = useMemo(() => {
    return createFieldSpecificQueryFormValidator(selectedFields, {
      useDateRange,
    });
  }, [selectedFields, useDateRange]);

  const [messageExactMatch, setMessageExactMatch] = useState<boolean>(true);
  const getLogsMutation = useGetLogsMutation();
  const form = useForm<z.infer<typeof fieldSpecificQueryFormValidation>>({
    resolver: zodResolver(fieldSpecificQueryFormValidation),
  });

  const onSubmit = (
    formData: z.infer<typeof fieldSpecificQueryFormValidation>,
  ) => {
    if (!auth?.user?.id) {
      toast({
        variant: "destructive",
        description: "User id not found",
      });
      return;
    }

    const payload = {
      userId: auth?.user?.id,
      ...formData,
      ...(messageExactMatch && { messageExactMatch: true }),
    };
    getLogsMutation.mutate(payload, {
      onSuccess: (response) => {
        if (response?.length > 0)
          toast({
            description: "Logs fetched successfully.",
          });
        else {
          toast({
            description: "No logs with the above filters found.",
          });
        }

        /* Save response into a state */
        setQueryLogs(response as QueryResultLog[]);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        toast({
          variant: "destructive",
          description: error?.response?.data?.message as string,
        });
      },
    });
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-y-4"
      >
        {selectedFields?.map((selectedField) => (
          <div key={selectedField.id}>
            {selectedField?.id !== "timestamp" ? (
              <FormField
                control={form.control}
                name={selectedField.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{selectedField?.label}</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value as string} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
                {!useDateRange ? (
                  <FormField
                    control={form.control}
                    name="timestamp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timestamp</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "ml-[5px] w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value as Date, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <DayPicker
                                mode="single"
                                fromYear={1970}
                                toYear={2030}
                                captionLayout="dropdown"
                                selected={field.value as Date}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <FormField
                      control={form.control}
                      name="min_timestamp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Min timestamp</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "ml-[5px] w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value as Date, "PPP")
                                    ) : (
                                      <span>Pick a start date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <DayPicker
                                  mode="single"
                                  fromYear={1970}
                                  toYear={2030}
                                  captionLayout="dropdown"
                                  selected={field.value as Date}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="max_timestamp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max timestamp</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "ml-[5px] w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value as Date, "PPP")
                                    ) : (
                                      <span>Pick a end date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <DayPicker
                                  mode="single"
                                  fromYear={1970}
                                  toYear={2030}
                                  captionLayout="dropdown"
                                  selected={field.value as Date}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                <div className="mt-2 flex items-center gap-x-2">
                  <Switch
                    id="useDateRange"
                    checked={useDateRange}
                    onCheckedChange={() => {
                      setUseDateRange(!useDateRange);
                    }}
                  />
                  <Label htmlFor="useDateRange">Use date range</Label>
                </div>
              </>
            )}

            {selectedField?.id === "message" && (
              <div className="mt-2 flex items-center gap-x-2">
                <Switch
                  id="messageExactMatch"
                  checked={messageExactMatch}
                  onCheckedChange={() => {
                    setMessageExactMatch(!messageExactMatch);
                  }}
                />
                <Label htmlFor="messageExactMatch">Message exact match</Label>
              </div>
            )}
          </div>
        ))}
        <Button
          className="mt-2 w-full"
          type="submit"
          disabled={getLogsMutation?.isLoading as boolean}
        >
          {getLogsMutation?.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Querying
            </>
          ) : (
            "Query"
          )}
        </Button>
      </form>
    </FormProvider>
  );
};
