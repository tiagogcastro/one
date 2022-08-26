import styled from 'styled-components';

export const Container = styled.div`
  margin: 7px 0;
`;

export const InputContent = styled.div`
  display: flex;
  align-items: center;

  border: 2px solid #584;
  border-radius: 5px;

  background-color: #fff;

  overflow: hidden;

  > svg {
    margin-left: 5px;
    color: #584;
  }
`;

export const InputField = styled.input`
  flex: 1;

  border: none;
  padding: 10px 7px;

  background-color: #fff;
`;

export const Label = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  margin-left: 3px;

  color: #584;
`;
