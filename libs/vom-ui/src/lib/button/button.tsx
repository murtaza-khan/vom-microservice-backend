import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ButtonProps {
  type?: string
  className?: string
  children?: React.ReactNode;
}

const StyledButton = styled.div`
  color: pink;
`;

export function Button(props: ButtonProps) {
  return (
    <StyledButton>
      <h1>Welcome to Button!</h1>
    </StyledButton>
  );
}

export default Button;
