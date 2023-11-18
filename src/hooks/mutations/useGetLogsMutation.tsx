import { getLogs } from "@main/endpoints/logs";
import { useMutation } from "@tanstack/react-query";

export const useGetLogsMutation = () => {
  return useMutation({
    mutationFn: getLogs,
    cacheTime: 0,
  });
};
