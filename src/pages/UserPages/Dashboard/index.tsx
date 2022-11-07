import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import { EquipamentsContainer } from '../../../components/EquipamentsContainer';
import { Header } from '../../../components/Layouts/Header/Header';
import { SideBar } from '../../../components/Sidebar';

export function ClientDashboardPage() {
  const { company_id } = useParams();

  return (
    <Box>
      <Header />
      <Box>
        <SideBar />
        <Box height="calc(100vh - 80px)" bgcolor="#1A1A1B" overflow="auto">
          <Box
            marginLeft={10}
            borderRadius="40px 0 0 0"
            p={2}
            height="auto"
            position="relative"
          >
            <EquipamentsContainer company_id={company_id} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
