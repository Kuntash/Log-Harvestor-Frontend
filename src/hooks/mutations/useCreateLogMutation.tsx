import { createLog } from "@main/endpoints/logs";
import { useMutation } from "@tanstack/react-query";

export const useCreateLogMutation = () => {
  return useMutation({
    mutationFn: createLog,
  });
};
