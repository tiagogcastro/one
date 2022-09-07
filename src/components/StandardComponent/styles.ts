import { Box as MuiBox } from '@mui/material';
import { styled as MStyled } from '@mui/system';

export const Container = MStyled(MuiBox)({
  backgroundColor: '#222',
  color: '#ddd',
}) as typeof MuiBox;
