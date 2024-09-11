import instance from "@/api/instance";

export async function statistics(params) {
  return instance.get("systemadmin/statisticsvipcars").then((res) => res.data);
}
export async function drivers(params) {
  return instance
    .get("systemadmin/statisticsvipcars/drivers", { params })
    .then((res) => res.data);
}
export async function tripPerMonth(params) {
  return instance
    .get("systemadmin/statisticsvipcars/notripspermonthbyyear", { params })
    .then((res) => res.data);
}
