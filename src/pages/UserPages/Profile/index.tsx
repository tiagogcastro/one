import { Box } from '@mui/material';

import Header from '../../../components/Layouts/Header/Header';
import { SideBar } from '../../../components/Sidebar';

export function ProfilePage() {
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
        ></Box>
      </Box>
    </Box>
  );
}
