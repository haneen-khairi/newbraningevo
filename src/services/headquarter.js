import instance from "@/api/instance";
import { useQuery } from "@tanstack/react-query";
import { fetchAllFloors } from "./floors";
import { fetchCompanies } from "./companies";
import { fetchAuthorities } from "./authorities";
import { fetchAllRooms } from "./rooms";

async function fetchHeadquarters(params) {
  return instance
    .get("hospitality/Headquarters", {
      params,
    })
    .then((res) => res.data);
}
async function fetchHeadquarter(id) {
  return instance.get(`hospitality/Headquarters/${id}`).then((res) => res.data);
}
async function createHeadquarters(data) {
  return instance
    .post("hospitality/Headquarters", data)
    .then((res) => res.data);
}
async function updateHeadquarters(data) {
  return instance.put("hospitality/Headquarters", data).then((res) => res.data);
}
async function deleteHeadquarters(id) {
  return instance
    .delete(`hospitality/Headquarters/${id}`)
    .then((res) => res.data);
}

function useFloors(params) {
  return useQuery({
    queryKey: ["floors", params],
    queryFn: () => fetchAllFloors(params),
    staleTime: 1000 * 60 * 1,
  });
}
function useCompanies(params) {
  return useQuery({
    queryKey: ["companies", params],
    queryFn: () => fetchCompanies(params),
    staleTime: 1000 * 60 * 1,
  });
}

function useAuthorities(params) {
  return useQuery({
    queryKey: ["Authorities", params],
    queryFn: () => fetchAuthorities(params),
    staleTime: 1000 * 60 * 1,
  });
}

function useRooms(params) {
  return useQuery({
    queryKey: ["rooms", params],
    queryFn: () => fetchAllRooms(params),
    staleTime: 1000 * 60 * 1,
  });
}

export {
  fetchHeadquarters,
  fetchHeadquarter,
  createHeadquarters,
  updateHeadquarters,
  deleteHeadquarters,
  useFloors,
  useAuthorities,
  useCompanies,
  useRooms,
};
