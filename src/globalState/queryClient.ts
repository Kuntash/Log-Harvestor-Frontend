import { type DefaultOptions, QueryClient } from "@tanstack/react-query";

export const tanstackQueryDefaultOptions: DefaultOptions = {
  queries: {
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  },
  mutations: {},
};

export const queryClient = new QueryClient({
  defaultOptions: tanstackQueryDefaultOptions,
});
