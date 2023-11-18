import { type QueryResultLog } from "@main/types";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export const queryLogsAtom = atom<QueryResultLog[]>([]);

export const useQueryLogsAtom = () => {
  return useAtom(queryLogsAtom);
};
export const useQueryLogsAtomValue = () => {
  return useAtomValue(queryLogsAtom);
};
export const useSetQueryLogsAtom = () => {
  return useSetAtom(queryLogsAtom);
};
