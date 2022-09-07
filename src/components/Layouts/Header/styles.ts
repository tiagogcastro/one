import { Box as MuiBox } from '@mui/material';
import { styled as MStyled } from '@mui/system';

export const Container = MStyled(MuiBox)({
  position: 'relative',
  height: '100px',
  width: '100vw',
  backgroundColor: '#654',
  color: '#ddd',
}) as typeof MuiBox;
