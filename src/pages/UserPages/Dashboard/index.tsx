import { Box, Button, Typography } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { useParams } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { EquipamentsContainer } from '../../../components/EquipamentsContainer';
import { Header } from '../../../components/Layouts/Header/Header';
import { SideBar } from '../../../components/Sidebar';
import { useState } from 'react';

export function ClientDashboardPage() {
  const { company_id } = useParams();

  const [openToEditPosition, setOpenToEditPosition] = useState(false);

  function handleChangeState() {
    setOpenToEditPosition((prevState) => !prevState);
  }

  return (
    <Box>
      <Header />
      <Box>
        <SideBar />
        <Box
          height="100%"
          marginLeft={10}
          paddingLeft={2}
          paddingY={2}
          borderRadius="40px 0 0 0"
          position="relative"
          bgcolor="#1A1A1B"
          overflow="hidden"
        >
          <Box display="flex" alignItems="center" gap={2} paddingBottom={2}>
            {openToEditPosition ? (
              <Typography>Desativar edição da posição dos equipamentos</Typography>
            ) : (
              <Typography>Ativar para editar posição dos equipamentos</Typography>
            )}
            <Button onClick={handleChangeState} color="primary" variant="contained">
              {openToEditPosition ? 'Desativar' : 'Ativar'}
            </Button>
          </Box>
          <DndProvider backend={HTML5Backend}>
            <EquipamentsContainer
              company_id={company_id}
              openToEditPosition={openToEditPosition}
            />
          </DndProvider>
        </Box>
      </Box>
    </Box>
  );
}
