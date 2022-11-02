import styled from 'styled-components';

export const Container = styled.header`
  background: #222;

  height: 80px;
  width: 100%;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const Logo = styled.img`
  height: 100%;
`;

export const Divider = styled.div`
  margin: 8px;
  color: #606060;
  border-left: 2px solid;
  height: 3vmax;
`;

export const DiaSemana = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  strong {
    margin-top: 8px;
    color: #dadada;
    font-size: 1.4vmax;
  }

  span {
    color: #999999;
    font-size: 0.8vmax;
  }
`;

export const RealTime = styled.div`
  display: flex;
  align-items: center;

  color: #dadada;
  font-size: 1.4vmax;
`;

export const Area = styled.div`
  display: flex;
  align-items: center;

  p {
    padding: 6px;
    color: #dadada;
    font-size: 1.4vmax;
  }
`;

export const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 150px;

  p {
    color: #606060;
    font-size: 1.2vmax;
  }

  strong {
    color: #dadada;
    font-size: 1.4vmax;
  }
`;

export const NameProfile = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
