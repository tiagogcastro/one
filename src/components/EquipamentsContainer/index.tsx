import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import { Company, Equipament as EquipamentInterface } from '../../services';
import { nouApi } from '../../services/clientApi';
import { Equipament } from '../Equipament';

export interface EquipamentsResponse {
  equipaments: EquipamentInterface[];
  company: Company;
}

export function EquipamentsContainer() {
  const { user } = useAuth();

  const [equipaments, setEquipaments] = useState<EquipamentsResponse | null>(null);

  async function getEquipaments() {
    try {
      const response = await nouApi.get<EquipamentsResponse | null>('/equipament/list', {
        params: {
          company_id: user?.UserCompany[0].companyId,
        },
      });

      setEquipaments(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEquipaments();
  }, []);

  return (
    <Box
      position="relative"
      overflow="auto"
      height="100%"
      display="flex"
      gap={3}
      flexWrap="wrap"
    >
      {equipaments?.equipaments &&
        equipaments.equipaments.map((equipament) => (
          <Link key={equipament.id} to={`/client/equipament/${equipament.id}`}>
            <Equipament equipament={equipament} />
          </Link>
        ))}
    </Box>
  );
}
