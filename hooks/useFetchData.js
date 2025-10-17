import { apiKit } from "@/app/lib/apiKit";
import { useQuery } from "@tanstack/react-query";


export function useFetchData(queryKey, endpoint, options = {}) {
  const fetchData = async () => {
    const res = await apiKit.get(endpoint);
    if (!res.success) throw new Error(`Failed to fetch ${endpoint}`);
    return res;
  };

  return useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: fetchData,
    ...options,
  });
}