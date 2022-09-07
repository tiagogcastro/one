import { Box as MuiBox } from '@mui/material';
import { styled as MStyled } from '@mui/system';

export const Container = MStyled(MuiBox)({
  position: 'absolute',
  height: '100vh',
  width: '200px',
  backgroundColor: '#456',
  color: '#ddd',
}) as typeof MuiBox;
