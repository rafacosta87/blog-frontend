import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 6rem;
  height: 6rem;
  border: 0.6rem solid ${({ theme }) => theme.colors.mediumGray};
  border-top-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  animation: ${rotate} 0.8s linear infinite;
`;

export const Loading = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};
