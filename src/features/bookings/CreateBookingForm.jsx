import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { styled } from "styled-components";
import { useSettings } from "../settings/useSettings.js";
import Spinner from "../../ui/Spinner";
import { addDays, differenceInDays, isAfter } from "date-fns";
import { getCountryFlag } from "../../utils/helpers";
import { useCreateBooking } from "./useCreateBooking";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

const StyledInputRadio = styled.div`
  display: flex;
  align-items: center;
  gap: 5.6rem;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

// const selectOptions = [
//   { value: "unconfirmed", label: "Unconfirmed" },
//   { value: "checked-in", label: "Checked in" },
//   { value: "checked-out", label: "Checked out" },
// ];

// const radioOptionsBreakfast = [
//   {
//     id: "yes",
//     label: "Yes",
//     value: true,
//   },
//   {
//     id: "no",
//     label: "No",
//     value: false,
//   },
// ];

// const radioOptionsPaid = [
//   {
//     id: "paid",
//     label: "Yes",
//   },
//   {
//     id: "unpaid",
//     label: "No",
//   },
// ];

function CreateBookingForm() {
  const { settings, isLoading } = useSettings();
  const { createBooking, isCreating } = useCreateBooking();
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  if (isLoading) return <Spinner />;
  const { minBookingLength, breakfastPrice } = settings;

  async function onSubmit(data) {
    const cabinName = data.cabinName;

    const guestData = {
      fullName: data.fullName,
      email: data.email,
      nationalID: data.nationalID,
      nationality: data.nationality,
      countryFlag: await getCountryFlag(data.nationality),
    };

    const bookingData = {
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      numNights: differenceInDays(
        new Date(data.endDate),
        new Date(data.startDate)
      ),
      numGuests: Number(data.numGuests),
      hasBreakfast: data.hasBreakfast === "true" ? true : false,
      isPaid: data.isPaid === "false" ? false : true,
    };

    const newBooking = {
      ...bookingData,
      extrasPrice:
        bookingData.hasBreakfast === true
          ? bookingData.numGuests * bookingData.numNights * breakfastPrice
          : 0,
    };

    createBooking({ cabinName, newGuest: guestData, newBooking });
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.cabinName?.message}>
        <Input
          type="text"
          id="cabinName"
          disabled={isCreating}
          {...register("cabinName", {
            required: "This filed is required",
          })}
        />
      </FormRow>
      <FormRow label="Guest name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isCreating}
          {...register("fullName", {
            required: "This filed is required",
          })}
        />
      </FormRow>
      <FormRow label="Guest email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isCreating}
          {...register("email", {
            required: "This filed is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>
      <FormRow label="Guest nationality" error={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          disabled={isCreating}
          {...register("nationality", {
            required: "This filed is required",
          })}
        />
      </FormRow>
      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          disabled={isCreating}
          defaultValue={1}
          {...register("numGuests", {
            required: "This filed is required",
          })}
        />
      </FormRow>
      <FormRow label="Guest nationalID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          disabled={isCreating}
          {...register("nationalID", {
            required: "This filed is required",
          })}
        />
      </FormRow>
      <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isCreating}
          {...register("startDate", {
            required: "This filed is required",
          })}
        />
      </FormRow>
      <FormRow label="End date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          disabled={isCreating}
          {...register("endDate", {
            required: "This filed is required",
            validate: (value) =>
              isAfter(
                new Date(value),
                addDays(new Date(getValues().startDate), minBookingLength - 1)
              ) || `Guest must be stay at least ${minBookingLength} nights`,
          })}
        />
      </FormRow>

      <FormRow label="Status" error={errors?.status?.message}>
        {/* customize later */}
        <StyledSelect
          id="status"
          disabled={isCreating}
          {...register("status", {
            required: "This filed is required",
          })}
        >
          <option value="unconfirmed">Unconfirmed</option>
          <option value="checked-in">Checked in</option>
          <option value="checked-out">Checked out</option>
        </StyledSelect>
      </FormRow>
      <FormRow label="Has breakfast?" error={errors?.hasBreakfast?.message}>
        <StyledInputRadio id="hasBreakfast">
          <Option>
            <input
              type="radio"
              value={true}
              name="hasBreakfast"
              id="yes"
              disabled={isCreating}
              {...register("hasBreakfast", {
                required: "This filed is required",
              })}
            />
            <label htmlFor="yes">Yes</label>
          </Option>
          <Option>
            <input
              type="radio"
              value={false}
              name="hasBreakfast"
              id="no"
              disabled={isCreating}
              {...register("hasBreakfast", {
                required: "This filed is required",
              })}
            />
            <label htmlFor="no">No</label>
          </Option>
        </StyledInputRadio>
      </FormRow>
      <FormRow label="Is paid?" error={errors?.isPaid?.message}>
        <StyledInputRadio id="isPaid">
          <Option>
            <input
              type="radio"
              value={true}
              name="isPaid"
              id="paid"
              disabled={isCreating}
              {...register("isPaid", {
                required: "This filed is required",
              })}
            />
            <label htmlFor="paid">Yes</label>
          </Option>
          <Option>
            <input
              type="radio"
              value={false}
              name="isPaid"
              id="unpaid"
              disabled={isCreating}
              {...register("isPaid", {
                required: "This filed is required",
              })}
            />
            <label htmlFor="unpaid">No</label>
          </Option>
        </StyledInputRadio>
      </FormRow>
      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea
          id="observations"
          disabled={isCreating}
          {...register("observations")}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" disabled={isCreating} type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Create new booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
