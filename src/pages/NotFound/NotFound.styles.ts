import styled from '@emotion/styled';

export const NotFoundContainer = styled.div`
  background-color: #0a0a0a;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    sans-serif;
  position: relative;
  overflow: hidden;
`;

export const Grid = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(20, 20, 20, 0.8) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 20, 20, 0.8) 1px, transparent 1px);
  background-size: 30px 30px;
  z-index: 1;
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
`;

export const ErrorCode = styled.div`
  font-size: 160px;
  font-weight: 700;
  opacity: 0.9;
  letter-spacing: -2px;

  @media (max-width: 768px) {
    font-size: 100px;
  }
`;

export const Message = styled.div`
  font-size: 20px;
  margin-top: 20px;
  color: #999;
  letter-spacing: 3px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const BackButton = styled.button`
  margin-top: 40px;
  padding: 12px 24px;
  background: transparent;
  border: 1px solid #333;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #666;
    background: rgba(255, 255, 255, 0.05);
  }
`;
