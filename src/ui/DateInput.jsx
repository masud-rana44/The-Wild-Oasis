import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const StyledDateInput = styled.div`
  display: flex;
  flex-direction: column;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker {
    font-family: Arial, sans-serif;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: absolute;
  }

  .react-datepicker__triangle {
    border-bottom-color: #fff;
  }

  .react-datepicker__header {
    background-color: #f0f0f0;
  }

  .react-datepicker__day-names {
    display: flex;
    justify-content: space-around;
    margin: 0.5rem 0;
  }

  .react-datepicker__day-name {
    width: 2rem;
    line-height: 2rem;
    text-align: center;
  }

  .react-datepicker__day {
    width: 2rem;
    line-height: 2rem;
    text-align: center;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .react-datepicker__day--selected {
    background-color: #007bff;
    color: #fff;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #007bff;
    color: #fff;
  }

  .react-datepicker__day--disabled {
    color: #ccc;
    cursor: not-allowed;
  }

  .react-datepicker__month {
    margin: 0.5rem 0;
  }
`;

function DateInput() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <StyledDateInput>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        popperPlacement="auto"
        popperModifiers={{
          flip: {
            behavior: ["bottom"],
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: "viewport",
          },
        }}
      />
    </StyledDateInput>
  );
}

export default DateInput;
