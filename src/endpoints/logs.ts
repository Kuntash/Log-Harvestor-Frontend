import {
  type GetLogsPayloadSchema,
  type CreateLogPayloadSchema,
} from "@main/types";
import { axiosInstance } from ".";
import { type AxiosError } from "axios";

export const createLog = async (payload: CreateLogPayloadSchema) => {
  try {
    const response = await axiosInstance.post("/log", payload);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  } catch (error) {
    console.error("createLog failed", error);
    throw error as AxiosError;
  }
};

export const getLogs = async (payload: GetLogsPayloadSchema) => {
  try {
    const response = await axiosInstance.get("/log", {
      params: payload,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  } catch (error) {
    console.error("getLogs failed", error);
    throw error as AxiosError;
  }
};
