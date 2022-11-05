import { Box, Collapse, IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import { Header } from '../../../components/Layouts/Header/Header';
import { SideBar } from '../../../components/Sidebar';
import { useAuth } from '../../../hooks/useAuth';
import { nouApi, UserData } from '../../../services';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UniqueTableRow } from './UniqueTableRow';
import ViewUserDataModal from './components/ViewUserDataModal';
import { UserListProvider } from '../../../context/users/UserListContext';
import { useUsersList } from '../../../hooks/useUsersList';
import { Link } from 'react-router-dom';

export function AdminDashboardPage() {
  const { user, signOut } = useAuth();
  const { setUsers, setCurrentUserData, currentUserData, users } = useUsersList();

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'E-mail', width: 220 },
    { field: 'name', headerName: 'Nome', width: 100 },
    { field: 'lastname', headerName: 'Último nome', width: 160 },
    { field: 'username', headerName: 'Username', width: 160 },
  ];
  const [isOpen, setIsOpen] = useState(false);

  async function getUsers() {
    try {
      const response = await nouApi.get<UserData[]>('/users/list');

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function handleRowClick(e: GridRowParams<UserData>) {
    setIsOpen(true);
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
              Listagem de usuários
            </Typography>
            <Link
              to="/admin/users/register"
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
            {/* <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography fontSize="1rem" fontWeight="bold">
                        Ver mais
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontSize="1rem" fontWeight="bold">
                        E-mail
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontSize="1rem" fontWeight="bold">
                        Nome
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontSize="1rem" fontWeight="bold">
                        Último nome
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontSize="1rem" fontWeight="bold">
                        Username
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users &&
                    users.map((user) => <UniqueTableRow key={user.id} user={user} />)}
                </TableBody>
              </Table>
            </TableContainer> */}
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

      {isOpen && (
        <ViewUserDataModal
          setUsers={setUsers}
          setCurrentUserData={setCurrentUserData}
          handleClose={handleCloseModal}
          isOpen={isOpen}
          user={currentUserData}
        />
      )}
    </Box>
  );
}
