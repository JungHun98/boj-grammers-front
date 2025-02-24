import styled from '@emotion/styled';

export const ErrorContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #d1d1d1;
  width: 100vw;
  height: 100vh;
  background-color: #2d2d2d;
`;

export const ErrorTitle = styled('div')`
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
  white-space: pre-line;
  text-align: center;
`;

export const ErrorCode = styled('div')`
  font-size: 5rem;
  font-weight: 700;
  color: #494e58;
`;
