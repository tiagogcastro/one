import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { BsSnow2, BsWifi, BsWifiOff } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { Company, Equipament as EquipamentInterface } from '../../services';

export interface EquipamentProps {
  equipament: EquipamentInterface;
}

export function Equipament({ equipament: data }: EquipamentProps) {
  const equipament = useMemo(() => {
    let decimalTemperature = new Array();

    if (data.params.temperature) {
      const temperatureStr = data.params.temperature.toString();
      const temperatureSplited = temperatureStr.split('.');
      decimalTemperature = temperatureSplited;
    }

    return {
      ...data,
      params: {
        ...data.params,
        temperature: Number(decimalTemperature[0]) || 0,
        decimalTemperature: Number(decimalTemperature[1]) || 0,
      },
    };
  }, [data]);

  return (
    equipament && (
      <>
        <Box
          style={{
            background: 'url(/tanque220x580.svg) no-repeat',
          }}
          width="220px"
          height="580px"
          position="relative"
        >
          <Box paddingY={2} paddingBottom={'190px'} height="100%">
            <Box bgcolor="#222" paddingX={1} marginX={1} marginY={4} height="100%">
              <Box
                display="flex"
                justifyContent="space-between"
                gap={2}
                position="relative"
              >
                <Typography
                  variant="h6"
                  component="h6"
                  fontWeight="bold"
                  width="100%"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  position="relative"
                  noWrap
                  title={equipament.name}
                >
                  {equipament.name}
                </Typography>
                <Typography
                  variant="h6"
                  component="h6"
                  title={
                    equipament.params.connected ? 'Wifi conectado' : 'Wifi desconectado'
                  }
                >
                  {equipament.params.connected ? <BsWifi /> : <BsWifiOff />}
                </Typography>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
                marginTop={4}
              >
                <Box>
                  <BsSnow2
                    color={equipament.params.output_status ? '#fff' : '#65656C'}
                    size={24}
                  />
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                  <Typography component="span" fontSize="80px" fontWeight="bold">
                    {equipament.params.temperature}
                  </Typography>
                  <Box width="100%" display="flex" flexDirection="column" gap={3}>
                    <Typography component="p" noWrap>
                      .{equipament.params.decimalTemperature || 0}°C
                    </Typography>
                    <Typography component="p" noWrap color="#65656C">
                      {equipament.params.temperature_setpoint.toFixed(2)}°C
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box marginTop={2} position="relative">
                <Typography component="p" textAlign="center" fontSize="1.8rem">
                  {equipament.params.volume}
                </Typography>
                <Box marginTop={2}>
                  <Typography
                    component="p"
                    textAlign="center"
                    fontSize="1.2rem"
                    fontWeight="bold"
                    width="100%"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    position="relative"
                    noWrap
                  >
                    {equipament.params.batch}
                  </Typography>
                  <Typography
                    component="p"
                    textAlign="center"
                    fontSize="1.2rem"
                    fontWeight="bold"
                    width="100%"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    position="relative"
                    noWrap
                  >
                    {equipament.params.recipe_name}
                  </Typography>
                  <Typography
                    component="p"
                    textAlign="center"
                    fontSize="1.2rem"
                    fontWeight="bold"
                    width="100%"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    position="relative"
                    noWrap
                  >
                    {equipament.params.process_status}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    )
  );
}
