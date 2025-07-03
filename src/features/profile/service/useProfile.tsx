import { api } from "@/shared/lib/axios";
import {
  useQuery,
} from "@tanstack/react-query";

export const useProfile = () => {

  const getProfile = () =>
    useQuery({
      queryKey: ['profile'],
      queryFn: () => api.get("auth/me").then((res) => res.data),
    });


  return { getProfile };
};
