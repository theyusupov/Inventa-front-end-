import { partner } from "@/shared/keys";
import { api } from "@/shared/lib/axios";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";

interface IParams {
    page?: string,
    limit?: string,
    search?: string,
    role: string,
    isActive?: string,
    sortBy?: string,
    sortOrder?: "asc" | "desc",
    debtOnly?: string
}

export const usePartner = () => {
  const queryClient = useQueryClient();

  const getPartners = (params:IParams) =>
    useQuery({
      queryKey: [partner, params],
      queryFn: () => api.get("partners", {params}).then((res) => res.data),
      placeholderData: keepPreviousData,
      staleTime: 1000 * 60 * 5, // re-fetch vaqti
      gcTime: 1000 * 60 * 10 // cache vaqti
    });

  const getPartner = (param:string) =>
    useQuery({
      queryKey: ["partner", param],
      queryFn: () => api.get(`partners/${param}`).then((res) => res.data)
    });

  const createPartner = useMutation({
    mutationFn: (body:any)=> api.post("partners", body).then(res => res.data),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: [partner]})
    }
  })

  return { getPartners, createPartner,getPartner };
};
