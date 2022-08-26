import styled from 'styled-components';

interface IContainerProps {
  color: string;
}

export const Container = styled.button<IContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px 12px;

  border-radius: 5px;

  color: #fff;
  background-color: #000;

  transition: opacity 0.3s;

  > svg {
    margin: 0 3px;
  }

  &:hover {
    opacity: 0.8;
  }
`;
