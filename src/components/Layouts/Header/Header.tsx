import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useAuth } from '../../../hooks/useAuth';

import * as Styles from './styles';

interface IProps {
  children?: React.ReactNode;
}

const Header: React.FC<IProps> = () => {
  const { user } = useAuth();

  return (
    <Styles.Container>
      <Styles.HeaderContent>
        <Styles.Logo src="/nou_logo.svg" />
        <Box display="flex" gap={2} alignItems="center" marginRight={4}>
          <Avatar
            alt={`Foto de usuário de ${user?.name} ${user?.lastname}`}
            src={user?.avatar || ''}
            sx={{ width: 48, height: 48 }}
          />
          <Box>
            <Typography fontWeight="bold">
              {user?.name} {user?.lastname}
            </Typography>
            <Typography color="#ccc">{user?.email}</Typography>
          </Box>
        </Box>
      </Styles.HeaderContent>
    </Styles.Container>
  );
};
export default Header;
