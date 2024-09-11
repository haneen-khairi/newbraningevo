export const statusEnum = {
  0: "pending",
  1: "approved",
  2: "rejected",
  3: "canceled",
  6: "completed",
};

// Pending, // One time  Permanent  Temporary
//             Approved, // One time  Permanent  Temporary
//             Rejected, // One time  Permanent  Temporary
//             Canceled, // One time  Permanent  Temporary
//             InPlace, // One time  Permanent  Temporary
//             OutPlace, // Permanent || Temporary
//             Completed, // One time
