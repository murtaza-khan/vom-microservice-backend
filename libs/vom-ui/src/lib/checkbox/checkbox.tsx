import styled from 'styled-components';

/* eslint-disable-next-line */
export interface CheckboxProps {}

const StyledCheckbox = styled.div`
  color: pink;
`;

export function Checkbox(props: CheckboxProps) {
  return (
    <StyledCheckbox>
      <h1>Welcome to Checkbox!</h1>
    </StyledCheckbox>
  );
}

export default Checkbox;
