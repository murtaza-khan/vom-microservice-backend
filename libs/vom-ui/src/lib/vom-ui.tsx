import styled from 'styled-components';

/* eslint-disable-next-line */
export interface VomUiProps {}

const StyledVomUi = styled.div`
  color: pink;
`;

export function VomUi(props: VomUiProps) {
  return (
    <StyledVomUi>
      <h1>Welcome to VomUi!</h1>
    </StyledVomUi>
  );
}

export default VomUi;
