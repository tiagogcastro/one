import {
  Avatar,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Typography,
  MenuItem,
} from '@mui/material';
import { Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useCompany } from '../../../hooks/useCompany';

import * as Styles from './styles';

interface HeaderProps {}

export function Header(_: HeaderProps) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { companies, currentCompanyId, handleChangeCurrentCompanyId } = useCompany();

  function handleChangeCompanyId(event: SelectChangeEvent) {
    handleChangeCurrentCompanyId(event.target.value as string);
    navigate(`/client/${event.target.value}/dashboard`);
  }

  return (
    <Styles.Container>
      <Styles.HeaderContent>
        <Styles.Logo src="/nou_logo.svg" />
        <Box
          display="flex"
          gap={8}
          alignItems="center"
          justifyContent="center"
          marginRight={4}
          marginLeft="auto"
        >
          {companies.length > 0 && (
            <Box width="260px">
              <FormControl fullWidth>
                <InputLabel>Nome da empresa</InputLabel>
                <Select
                  fullWidth
                  value={currentCompanyId || ''}
                  label="Nome da empresa"
                  onChange={handleChangeCompanyId}
                >
                  {companies.map(({ company }) => (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          <Box display="flex" gap={2} alignItems="center">
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
        </Box>
      </Styles.HeaderContent>
    </Styles.Container>
  );
}
