import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isCreating } = useMutation({
    mutationFn: createBookingApi,

    onSuccess: () => {
      toast.success("New booking successfully created");

      queryClient.invalidateQueries({ active: false });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createBooking, isCreating };
}
