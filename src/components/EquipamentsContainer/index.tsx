import { Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Company, Equipament as EquipamentInterface } from '../../services';
import { nouApi } from '../../services/clientApi';
import { apiError } from '../../utils/formatApiError';
import { DragDropItem } from '../DragDrop/Box';
import { DragDropContainer } from '../DragDrop/Container';
import { Equipament } from '../Equipament';

export interface EquipamentsResponse {
  equipaments: EquipamentInterface[];
  company: Company;
}

export interface EquipamentsContainerProps {
  company_id: string | undefined;
  openToEditPosition: boolean;
}

export function EquipamentsContainer({
  company_id,
  openToEditPosition,
}: EquipamentsContainerProps) {
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
  }, [company_id]);

  async function updateEquipamentPositionDB(
    equipament_id: string,
    posY: number,
    posX: number,
  ) {
    try {
      await nouApi.put('/equipament/update', {
        company_id,
        equipament_id,
        posX,
        posY,
      });

      toast.success('Sucesso! Posição do equipamento atualizada', {
        style: {
          background: '#222222',
        },
        autoClose: 2000,
      });
    } catch (error) {
      const errors = apiError(error);

      errors.messages.map((message) => {
        toast.error(message, {
          style: {
            background: '#222222',
          },
        });
      });
    }
  }

  const moveEquipament = useCallback(
    async (id: string, posX: number, posY: number) => {
      setEquipaments((prevState) => {
        if (prevState?.equipaments) {
          let foundItem = prevState?.equipaments.find((item) => item.id === id);

          if (foundItem) {
            foundItem = {
              ...foundItem,
              posX,
              posY,
            };

            prevState.equipaments = prevState?.equipaments.filter(
              (item) => item.id !== id,
            );

            return {
              ...prevState,
              equipaments: [...prevState.equipaments, foundItem],
            };
          }
        }

        return prevState;
      });

      await updateEquipamentPositionDB(id, posY, posX);
    },
    [equipaments, setEquipaments],
  );

  if (!equipaments) {
    return <>Loading...</>;
  }

  return (
    <DragDropContainer moveItems={moveEquipament}>
      {equipaments?.equipaments &&
        equipaments.equipaments.map((equipament) => (
          <>
            {openToEditPosition ? (
              <DragDropItem
                id={equipament.id}
                posX={equipament.posX}
                posY={equipament.posY}
                key={equipament.id}
              >
                <Equipament equipament={equipament} />
              </DragDropItem>
            ) : (
              <Link
                key={equipament.id}
                to={`/client/${company_id}/equipament/${equipament.id}`}
              >
                <Box
                  position="absolute"
                  left={equipament.posX}
                  top={equipament.posY}
                  data-testid="box"
                >
                  <Equipament equipament={equipament} />
                </Box>
              </Link>
            )}
          </>
        ))}
    </DragDropContainer>
  );
}
