import styled from 'styled-components';

/* eslint-disable-next-line */
export interface InputProps {
  size?: string
  placeholder?: string
  type?: string
}

const StyledInput = styled.div`
  color: pink;
`;

export function Input(props: InputProps) {
  return (
    <StyledInput>
      <h1>Welcome to Input!</h1>
    </StyledInput>
  );
}

export default Input;
