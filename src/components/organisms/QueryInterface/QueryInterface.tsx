import { Card, CardContent, CardDescription } from "@main/components/ui/card";
import { Separator } from "@main/components/ui/separator";
import React, { useState } from "react";
import { FieldSpecificQueryInterface } from "./FieldSpecificQueryInterface";
import { FullTextQueryInterface } from "./FullTextQueryInterface";
import { useQueryLogsAtomValue } from "@main/globalState/logs";
import { format } from "date-fns";

export const QUERY_TYPES: {
  label: string;
  id: "field-specific-query" | "full-text-query";
}[] = [
  {
    label: "Field Specific Query",
    id: "field-specific-query",
  },
  {
    label: "Full Text Query",
    id: "full-text-query",
  },
];

export const QueryInterface = () => {
  const [selectedQueryType, setSelectedQueryType] = useState<
    "field-specific-query" | "full-text-query"
  >("field-specific-query");

  const allLogs = useQueryLogsAtomValue();
  console.log(
    "🚀 ~ file: QueryInterface.tsx:28 ~ QueryInterface ~ allLogs:",
    allLogs,
  );
  return (
    <>
      <Card className="flex max-w-full flex-col gap-x-4 p-4 text-left md:flex-row">
        <div className="flex flex-shrink-0 flex-col items-stretch gap-y-2 font-semibold md:gap-y-4">
          {QUERY_TYPES?.map((queryType) => (
            <button
              key={queryType?.id}
              className={`${
                queryType?.id === selectedQueryType && "bg-muted"
              } rounded-sm p-2 text-left`}
              onClick={() => {
                setSelectedQueryType(queryType?.id);
              }}
            >
              {queryType?.label}
            </button>
          ))}
        </div>
        <div>
          <Separator orientation="vertical" className="w-[2px]" />
        </div>
        {selectedQueryType === "field-specific-query" && (
          <FieldSpecificQueryInterface />
        )}
        {selectedQueryType === "full-text-query" && <FullTextQueryInterface />}
      </Card>

      {allLogs?.length > 0 && (
        <section className="mt-4 text-left">
          <h3 className="text-xl font-semibold">Query results</h3>
          <div className="mt-4 grid grid-cols-3 gap-8">
            {allLogs?.map((log) => (
              <Card key={log?._id} className="p-4">
                <CardContent>
                  <div className="flex flex-wrap items-center gap-2 rounded-md border p-4">
                    <span className="text-sm font-medium leading-none">
                      Level
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {log?.level}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 rounded-md border p-4">
                    <span className="text-sm font-medium leading-none">
                      Message
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {log?.message}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 rounded-md border p-4">
                    <span className="text-sm font-medium leading-none">
                      Resource ID
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {log?.resourceId}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 rounded-md border p-4">
                    <span className="text-sm font-medium leading-none">
                      Timestamp
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(log?.timestamp), "PPP")}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 rounded-md border p-4">
                    <span className="text-sm font-medium leading-none">
                      Trace ID
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {log?.traceId}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 rounded-md border p-4">
                    <span className="text-sm font-medium leading-none">
                      Span ID
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {log?.spanId}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 rounded-md border p-4">
                    <span className="text-sm font-medium leading-none">
                      Commit
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {log?.commit}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 rounded-md border p-4">
                    <span className="text-sm font-medium leading-none">
                      Metadata ( Parent resource ID)
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {log?.metadata?.parentResourceId}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </>
  );
};
