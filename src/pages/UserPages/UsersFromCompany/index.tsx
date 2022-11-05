import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

import Header from '../../../components/Layouts/Header/Header';
import { SideBar } from '../../../components/Sidebar';
import { nouApi, UserFromCompanyData } from '../../../services';

import ViewUserDataModal from './components/ViewUserDataModal';
import { useUsersFromCompanyList } from '../../../hooks/useUsersFromCompanyList';
import { Link } from 'react-router-dom';

export function UsersFromCompanyPage() {
  const { setUsers, setCurrentUserData, users } = useUsersFromCompanyList();

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'E-mail', width: 220 },
    { field: 'name', headerName: 'Nome', width: 100 },
    { field: 'lastname', headerName: 'Último nome', width: 160 },
    { field: 'username', headerName: 'Username', width: 160 },
  ];

  const [isOpen, setIsOpen] = useState(false);

  async function getUsers() {
    try {
      const response = await nouApi.get<UserFromCompanyData[]>('/user-company/list', {
        params: {
          company_id: '15a434f5-386a-4400-be43-50018ba0f19e',
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function handleRowClick(e: GridRowParams<UserFromCompanyData>) {
    setIsOpen(true);
    console.log(e);
    setCurrentUserData(e.row);
  }

  async function handleCloseModal() {
    setIsOpen(false);
    setCurrentUserData(null);
  }

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
          pb={16}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            gap={4}
            py={4}
            px={2}
            maxWidth="1280px"
            mx="auto"
          >
            <Typography component="h1" fontSize="1.6rem">
              Listagem de usuários da empresa
            </Typography>
            <Link
              to="/client/admin/users/register"
              style={{
                maxWidth: 'max-content',
                height: '100%',
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',

                background: '#FEC84B',
                color: '#000',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                transition: 'background 0.3s',
              }}
            >
              Criar nova conta
            </Link>
          </Box>
          <Box
            height="100%"
            maxWidth="1280px"
            px={2}
            mx="auto"
            overflow="auto"
            position="relative"
          >
            <DataGrid
              autoHeight
              rows={users}
              columns={columns}
              pageSize={10}
              onRowClick={handleRowClick}
            />
          </Box>
        </Box>
      </Box>

      {isOpen && <ViewUserDataModal handleClose={handleCloseModal} isOpen={isOpen} />}
    </Box>
  );
}
