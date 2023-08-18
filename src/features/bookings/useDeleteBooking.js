import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

// export function useDeleteBooking() {
//   const queryClient = useQueryClient();

//   const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
//     mutationFn: (bookingId) => deleteBookingApi(bookingId),
//     onSuccess: () => {
//       toast.success("Booking successfully deleted");

//       queryClient.invalidateQueries({
//         active: true,
//       });
//     },
//     onError: (err) => {
//       toast.error(err.message);
//     },
//   });

//   return { isDeleting, deleteBooking };
// }


export function useDeleteBooking() {
  const { mutate: deleteBooking, isLoading: isDeleting} = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success(`Booking ${}`)
    }
  })
}