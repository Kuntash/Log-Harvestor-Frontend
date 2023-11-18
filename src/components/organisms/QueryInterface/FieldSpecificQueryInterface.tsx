import React, { useState } from "react";
import { type Field } from "@main/types";
import { FieldSpecificQueryForm } from "./FieldSpecificQueryForm";

export const FIELDS: Field[] = [
  {
    id: "level",
    label: "Level",
    order: 1,
  },
  {
    id: "message",
    label: "Message",
    order: 2,
  },
  {
    id: "resourceId",
    label: "Resource ID",
    order: 3,
  },
  {
    id: "timestamp",
    label: "Timestamp",
    order: 4,
  },
  {
    id: "traceId",
    label: "Trace ID",
    order: 5,
  },
  {
    id: "spanId",
    label: "Span ID",
    order: 6,
  },
  {
    id: "commit",
    label: "Commit",
    order: 7,
  },
  {
    id: "metadata_parentResourceId",
    label: "Meta data ( Parent resource ID )",
    order: 8,
  },
];
export const FieldSpecificQueryInterface = () => {
  const [selectedFields, setSelectedFields] = useState<Field[]>([]);

  return (
    <div>
      {/* Filter toggles */}
      <div className="flex flex-wrap gap-2">
        {FIELDS?.map((field) => (
          <button
            className={`${
              selectedFields?.find(
                (selectedField) => selectedField.id === field.id,
              ) && "bg-muted"
            } rounded-sm border-[1px] border-muted p-2`}
            key={field?.id}
            onClick={() => {
              if (
                selectedFields?.find(
                  (selectedField) => selectedField.id === field.id,
                )
              ) {
                setSelectedFields((previousSelectedFields) =>
                  previousSelectedFields.filter(
                    (previousField) => previousField.id !== field?.id,
                  ),
                );
              } else {
                setSelectedFields((previousSelectedFields) =>
                  [...previousSelectedFields, field].sort(
                    (a, b) => a.order - b.order,
                  ),
                );
              }
            }}
          >
            {field?.label}
          </button>
        ))}
      </div>

      {!!selectedFields?.length && (
        <FieldSpecificQueryForm selectedFields={selectedFields} />
      )}
    </div>
  );
};
