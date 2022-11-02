import React from 'react';

import * as Styles from './styles';

interface IProps {
  children?: React.ReactNode;
}

const Header: React.FC<IProps> = () => {
  return (
    <Styles.Container>
      <Styles.HeaderContent>
        <Styles.Logo src="/nou_logo.svg" />
      </Styles.HeaderContent>
    </Styles.Container>
  );
};
export default Header;
