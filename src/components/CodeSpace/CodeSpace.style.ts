import styled from '@emotion/styled';

export const Wrapper = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #1e1e1e;
  overflow: auto;

  & .cm-editor * {
    font-family: Menlo, Monaco, 'Source Code Pro', consolas, monospace;
    font-size: 16px;
  }

  & .cm-theme * {
    background-color: transparent;
  }

  @media (max-width: 768px) {
    height: auto !important;
  }
`;
