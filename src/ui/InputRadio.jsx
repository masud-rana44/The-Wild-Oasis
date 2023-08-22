import { styled } from "styled-components";
import Input from "./Input";

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

function InputRadio({ name, options }) {
  return (
    <StyledInputRadio>
      {options.map((option) => {
        return (
          <Option key={option.id}>
            <Input
              type="radio"
              value={option.value}
              name={name}
              id={option.id}
            />
            <label htmlFor={option.id}>{option.label}</label>
          </Option>
        );
      })}
    </StyledInputRadio>
  );
}

export default InputRadio;
