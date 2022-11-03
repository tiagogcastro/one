import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
`;

export const ClosedSideBar = styled.aside`
  max-width: 80px;
  width: 100%;
  height: 100%;
  background: #222222;

  position: fixed;
  left: 0;
  top: 80px;
  z-index: 100;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  svg {
    color: #ffebbc;
    path {
      color: #ffebbc;
    }
  }

  .sidebar_principal_links {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    ul {
      width: 100%;
      margin-top: 16px;
      padding: 16px;

      text-align: center;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 8px;

      a {
        max-width: 48px;
        max-height: 48px;
        height: 100%;
        width: 100%;
        padding: 16px 0;
        border-radius: 8px;

        background: #49494e;

        display: flex;
        align-items: center;
        justify-content: center;

        transition: background 0.3s;

        &:hover {
          filter: brightness(90%);
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }

      button {
        max-width: 48px;
        max-height: 48px;
        height: 100%;
        width: 100%;
        padding: 16px 0;
        border-radius: 8px;

        background: #49494e;

        display: flex;
        align-items: center;
        justify-content: center;

        transition: background 0.3s;

        &:hover {
          filter: brightness(90%);
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

export const OpenSideBar = styled.aside`
  width: 100%;
  height: 100%;

  position: fixed;
  left: 0;
  top: 80px;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    color: #ffebbc;
    path {
      color: #ffebbc;
    }
  }

  section {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;

    max-width: 240px;
    width: 100%;
    height: 100%;

    background: #222222;

    .sidebar_principal_links {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      justify-content: space-between;

      ul {
        width: 100%;
        margin-top: 16px;
        padding: 16px;

        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 8px;

        a {
          width: 100%;
          max-height: 48px;
          height: 100%;
          width: 100%;
          padding: 16px 0 16px 8px;
          border-radius: 8px;

          background: #49494e;

          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;

          transition: background 0.3s;

          &:hover {
            filter: brightness(90%);
          }

          svg {
            width: 20px;
            height: 20px;
          }
        }

        button {
          width: 100%;
          max-height: 48px;
          height: 100%;
          width: 100%;
          padding: 16px 0 16px 8px;
          border-radius: 8px;

          background: #49494e;

          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;

          transition: background 0.3s;

          &:hover {
            filter: brightness(90%);
          }

          svg {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }

  button {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.38);
  }
`;
