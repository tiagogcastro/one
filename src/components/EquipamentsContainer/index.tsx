import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Company, Equipament as EquipamentInterface } from '../../services';
import { nouApi } from '../../services/clientApi';
import { apiError } from '../../utils/formatApiError';
import { Equipament } from '../Equipament';

export interface EquipamentsResponse {
  equipaments: EquipamentInterface[];
  company: Company;
}

export interface EquipamentsContainerProps {
  company_id: string | undefined;
}

export function EquipamentsContainer({ company_id }: EquipamentsContainerProps) {
  const navigate = useNavigate();

  const [equipaments, setEquipaments] = useState<EquipamentsResponse | null>(null);

  async function getEquipaments() {
    try {
      const response = await nouApi.get<EquipamentsResponse | null>('/equipament/list', {
        params: {
          company_id,
        },
      });

      setEquipaments(response.data);
    } catch (error) {
      const errors = apiError(error);

      errors.messages.map((message) => {
        toast.error(message, {
          style: {
            background: '#222222',
          },
        });
      });

      toast.info('Redirecionado para página de perfil', {
        style: {
          background: '#222222',
        },
      });

      navigate('/profile');
    }
  }

  useEffect(() => {
    getEquipaments();
  }, []);

  if (!equipaments) {
    return <>Loading...</>;
  }

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
