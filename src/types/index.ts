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
