import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { styled } from "styled-components";
import { useSettings } from "../settings/useSettings.js";
import Spinner from "../../ui/Spinner";
import { addDays, isAfter } from "date-fns";

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
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;
  const { minBookingLength } = settings;

  function onSubmit(data) {
    console.log(data);
  }

  if (isLoading) return <Spinner />;

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Guest name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This filed is required",
          })}
        />
      </FormRow>
      <FormRow label="Guest email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
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
          {...register("nationality", {
            required: "This filed is required",
          })}
        />
      </FormRow>
      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
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
          {...register("nationalID", {
            required: "This filed is required",
          })}
        />
      </FormRow>
      <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This filed is required",
          })}
        />
      </FormRow>
      <FormRow label="End date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
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
              {...register("isPaid", {
                required: "This filed is required",
              })}
            />
            <label htmlFor="unpaid">No</label>
          </Option>
        </StyledInputRadio>
      </FormRow>
      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea id="observations" {...register("observations")} />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
