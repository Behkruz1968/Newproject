import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";

export const useUser = () => {
    const queryClient = useQueryClient()

    const getUser = useQuery({
        queryKey: ["user"],
        queryFn: ()=> api.get("/user")
    })

    const createUser = useMutation({
        mutationFn: (body) => api.post("/user", body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        } 
    })

    const updateUser = useMutation({
        mutationFn: ({body, id}) => api.put(`/user/${id}`, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        } 
    })

    const deleteUser = useMutation({
        mutationFn: (id) => api.delete(`/user/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        } 
    })

    return {getUser, createUser, updateUser, deleteUser}
}