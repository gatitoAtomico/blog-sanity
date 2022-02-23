import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useGetAllAssets = () => {
  return useSWR(`/api/assets`, fetcher);
};
