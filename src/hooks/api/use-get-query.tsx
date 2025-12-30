import { useQuery } from "@tanstack/react-query";
import useApi from "./use-api.js";

const useGetQuery = ({
  url,
  params,
  config,
  queryProps,
}: {
  url: string;
  params?: any;
  config?: any;
  queryProps?: any;
}) => {
  const { request } = useApi();

  const { ...rest } = useQuery({
    queryFn: () => request.get(url, { params, ...config }),
    ...queryProps,
  });

  return { ...rest };
};

export default useGetQuery;
