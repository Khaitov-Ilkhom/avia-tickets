import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./use-api.js";

const usePostQuery = ({
  queryKey,
  listKey,
}: {
  queryKey?: string[] | any;
  listKey?: string[];
}) => {
  const { request } = useApi();

  const queryClient = useQueryClient();

  const mutationFn = ({
    url,
    attributes,
    config = {},
  }: {
    url: string;
    attributes: any;
    config?: any;
  }) => request.post(url, attributes, config);

  const { ...rest } = useMutation({
    mutationFn: ({
      url,
      attributes,
      config = {},
    }: {
      url: string;
      attributes: any;
      config?: any;
    }) => mutationFn({ url, attributes, config }),
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey }).then(() => {});
        if (listKey) {
          queryClient.invalidateQueries({ queryKey: listKey }).then(() => {});
        }
      }
    },
  });

  return { ...rest };
};

export default usePostQuery;
