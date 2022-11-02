import { Box, Button, Tabs, Tab } from '@mui/material';
import { SubmitHandler } from '@unform/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Equipament } from '../../../components/Equipament';
import { Input } from '../../../components/Forms/Input';
import Header from '../../../components/Layouts/Header/Header';
import { SideBar } from '../../../components/Sidebar';
import { a11yProps, TabPanel } from '../../../components/Tabs/TabPanel';
import { Company, Equipament as EquipamentInterface, nouApi } from '../../../services';
import { apiError } from '../../../utils/formatApiError';

export interface EquipamentResponse {
  equipament: EquipamentInterface;
  company: Company;
}

export function UniqueEquipamentPage() {
  const [data, setEquipament] = useState<EquipamentResponse | null>(null);

  const params = useParams();
  const equipamentId = params.equipament_id;

  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  async function getUniqueEquipament() {
    try {
      const response = await nouApi.get<EquipamentResponse | null>(
        '/equipament/list-unique',
        {
          params: {
            equipament_id: equipamentId,
            company_id: '83b7eb03-97da-444c-9dc0-799336aaff54',
          },
        },
      );

      setEquipament(response.data);
    } catch (error) {
      console.log(error);
      navigate('/dashboard');
    }
  }

  useEffect(() => {
    getUniqueEquipament();
  }, []);

  const updateInfoForm = useForm<EquipamentInterface>();

  const handleUpdateInfo: SubmitHandler<EquipamentInterface> = async (dataInfo) => {
    try {
      const response = await nouApi.put('/equipament/update', {
        company_id: data?.company.id,
        equipament_id: equipamentId,
        params: {
          ...dataInfo.params,
          temperature: Number(dataInfo.params.temperature),
          temperature_setpoint: Number(dataInfo.params.temperature_setpoint),
        },
      });

      setEquipament(response.data);

      toast.success('Sucesso! Informações do equipamento foram atualizadas', {
        style: {
          background: '#222222',
        },
      });
    } catch (error: any) {
      const errors = apiError(error);

      errors.messages.forEach((message) => {
        toast.error(message, {
          style: {
            background: '#222222',
          },
        });
      });
    }
  };

  const updateConfigForm = useForm<EquipamentInterface>();

  const handleUpdateConfig: SubmitHandler<EquipamentInterface> = async (dataInfo) => {
    try {
      const response = await nouApi.put('/equipament/update', {
        company_id: data?.company.id,
        equipament_id: equipamentId,
        equipament_name: dataInfo.name,
        params: {
          ...dataInfo.params,
          histerese: Number(dataInfo.params.histerese),
          offset: Number(dataInfo.params.offset),
        },
      });

      setEquipament(response.data);

      toast.success('Sucesso! Configurações do equipamento foram atualizadas', {
        style: {
          background: '#222222',
        },
      });
    } catch (error: any) {
      const errors = apiError(error);

      errors.messages.forEach((message) => {
        toast.error(message, {
          style: {
            background: '#222222',
          },
        });
      });
    }
  };

  if (!data) {
    return (
      <Box>
        <Header />
        <Box>
          <SideBar />
          <Box>Loading...</Box>
        </Box>
      </Box>
    );
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
          p={6}
          height="calc(100vh - 80px)"
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="auto"
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            flexWrap="wrap"
            gap={4}
          >
            <Box>{data && <Equipament equipament={data.equipament} />}</Box>
            <Box bgcolor="#222222" p={4} height="max-content">
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="Tabs para edição de dados do equipamento"
                >
                  <Tab label="Informações" {...a11yProps(0)} />
                  <Tab label="Configurações" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Box
                  component="form"
                  onSubmit={updateInfoForm.handleSubmit(handleUpdateInfo as any)}
                >
                  <Input
                    {...updateInfoForm.register('params.recipe_name')}
                    labelText="Receita"
                    defaultValue={data?.equipament.params.recipe_name}
                  />
                  <Input
                    {...updateInfoForm.register('params.batch')}
                    labelText="Lote"
                    defaultValue={data?.equipament.params.batch}
                  />
                  <Input
                    {...updateInfoForm.register('params.process_status')}
                    labelText="Etapa"
                    defaultValue={data?.equipament.params.process_status}
                  />
                  <Input
                    {...updateInfoForm.register('params.volume')}
                    labelText="Volume"
                    defaultValue={data?.equipament.params.volume}
                  />
                  <Input
                    {...updateInfoForm.register('params.temperature_setpoint')}
                    labelText="Setpoint temperatura"
                    type="number"
                    defaultValue={data?.equipament.params.temperature_setpoint}
                  />
                  <Input
                    {...updateInfoForm.register('params.temperature')}
                    labelText="Temperatura"
                    type="number"
                    defaultValue={data?.equipament.params.temperature}
                  />
                  <Box marginTop={3}>
                    <Button
                      type="submit"
                      style={{ background: '#FEC84B', color: '#000', width: '100%' }}
                    >
                      Atualizar Informações
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Box
                  component="form"
                  onSubmit={updateConfigForm.handleSubmit(handleUpdateConfig as any)}
                >
                  <Input
                    {...updateConfigForm.register('name')}
                    labelText="Nome do equipamento"
                    defaultValue={data?.equipament.name}
                  />
                  <Input
                    {...updateConfigForm.register('params.offset')}
                    labelText="Offset"
                    defaultValue={data?.equipament.params.offset}
                    type="number"
                  />
                  <Input
                    {...updateConfigForm.register('params.histerese')}
                    labelText="Histerese"
                    defaultValue={data?.equipament.params.histerese}
                    type="number"
                  />
                  <Box marginTop={3}>
                    <Button
                      type="submit"
                      style={{ background: '#FEC84B', color: '#000', width: '100%' }}
                    >
                      Atualizar Configurações
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
