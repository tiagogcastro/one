import { Box } from '@mui/material';
import React from 'react';

import { EquipamentsContainer } from '../../../components/EquipamentsContainer';
import Header from '../../../components/Layouts/Header/Header';
import { SideBar } from '../../../components/Sidebar';
import { useAuth } from '../../../hooks/useAuth';

const Home: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Box>
      <Header />
      <Box>
        <SideBar />
        <Box
          marginLeft={10}
          borderRadius="40px 0 0 0"
          bgcolor="#1A1A1B"
          p={2}
          height="calc(100vh - 80px)"
          position="relative"
        >
          <EquipamentsContainer />
        </Box>
      </Box>
    </Box>
  );
};
export default Home;
