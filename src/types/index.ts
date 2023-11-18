export type LogPostSchema = {
  level: string;
  message: string;
  resourceId: string;
  timestamp: string;
  traceId: string;
  spanId: string;
  commit: string;
  metadata: {
    parentResourceId: string;
  };
};

export type CreateLogPayloadSchema = LogPostSchema & {
  userId: string;
};

export type QueryResultLog = LogPostSchema & {
  _id: string;
};

export type GetLogsPayloadSchema = {
  userId: string;
  level?: string;
  message?: string;
  messageExactMatch?: boolean;
  resourceId?: string;
  timestamp?: string;
  traceId?: string;
  spanId?: string;
  commit?: string;
  min_timestamp?: string;
  max_timestamp?: string;
  metadata_parentResourceId?: string;
};

export type Field = {
  id: string;
  label: string;
  order: number;
};
