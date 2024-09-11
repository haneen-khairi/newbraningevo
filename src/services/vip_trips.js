import instance from "@/api/instance";
import { useQuery, useMutation } from "@tanstack/react-query";
function GetVipTrips(params) {
  return useQuery({
    queryKey: ["vipTrips", params],
    queryFn: () =>
      instance.get("vipcar/trips", { params }).then((res) => res.data),
  });
}
function GetAllAdminRequests(params) {
  return useQuery({
    queryKey: ["adminRequests", params],
    queryFn: () =>
      instance.get("hospitality/admin-request", { params }).then((res) => res.data),
  });
}
function GetAllVisitReasons(params) {
  return useQuery({
    queryKey: ["visitReasons", params],
    queryFn: () =>
      instance.get("hospitality/visit-reasons", { params }).then((res) => res.data),
  });
}
function GetAllCancelVisitReasons(params) {
  return useQuery({
    queryKey: ["cancelVisitReasons", params],
    queryFn: () =>
      instance.get("hospitality/cancel-visit-reasons", { params }).then((res) => res.data),
  });
}
function UpdateVipTrip(data) {
  return useMutation({
    mutationFn: async (data) => {
      return instance.put("vipcar/trips/" + data.id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    ...data,
  });
}
function DeleteVipTrip(...params) {
  return useMutation({
    mutationFn: async (data) => {
      return instance.delete("vipcar/trips/" + data.id).then((res) => res.data);
    },
    ...params,
  });
}

function CreateVipTrip(data) {
  return instance.post("vipcar/trips/request", data).then((res) => res.data);
}

function ChangeTripDriver(data) {
  return instance
    .post(
      "vipcar/trips/tripassigneddriver/" + data.tripId + "/" + data.driverId,
    )
    .then((res) => res.data);
}

function CancelTripUser(data) {
  return useMutation({
    mutationFn: async (v) => {
      return instance
        .post("vipcar/trips/ridecanceltrip/" + v.tripId, v)
        .then((res) => res.data);
    },
    ...data,
  });
}

function CancelTripDriver(data) {
  return useMutation({
    mutationFn: async (data) => {
      return instance
        .post("vipcar/trips/drivercanceltrip/" + data.tripId)
        .then((res) => res.data);
    },
    ...data,
  });
}

function AcceptOrRejectRequest(data) {
  return useMutation({
    mutationFn: async (v) => {
      return instance
        .put(
          "vipcar/vipcancelrequest/admincancelconfirmtrip/" +
            v.id +
            "/" +
            v.requestStatus,
        )
        .then((res) => res.data);
    },
    ...data,
  });
}
function RejectRequestVisits(data) {
  return useMutation({
    mutationFn: async (data) => {
      return instance
        .put("/hospitality/admin-request/cancel", data)
        .then((res) => res.data);
    },
    ...data,
  });
}
function AcceptRequestVisits(data) {
  return useMutation({
    mutationFn: async (data) => {
      return instance
        .put("/hospitality/admin-request/accept", data)
        .then((res) => res.data);
    },
    ...data,
  });
}
export {
  GetVipTrips,
  UpdateVipTrip,
  DeleteVipTrip,
  CreateVipTrip,
  ChangeTripDriver,
  CancelTripUser,
  CancelTripDriver,
  AcceptOrRejectRequest,
  RejectRequestVisits,
  AcceptRequestVisits,
  GetAllAdminRequests,
  GetAllVisitReasons,
  GetAllCancelVisitReasons
};
