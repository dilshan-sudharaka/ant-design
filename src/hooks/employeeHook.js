import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteEmp,
  FetchAllEmp,
  FetchEmpById,
  PostEmp,
  UpdateEmp,
} from "../services/employeeServices";

export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: FetchAllEmp,
  });
}

export function useEmployee(id) {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => FetchEmpById(id),
    enabled: !!id,
  });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newEmp) => PostEmp(newEmp),
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
    },
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedData }) => UpdateEmp(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
    },
  });
}

export function useDeleteEmployee() {
  const quertClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => DeleteEmp(id),
    onSuccess: () => {
      quertClient.invalidateQueries(["employees"]);
    },
  });
}
