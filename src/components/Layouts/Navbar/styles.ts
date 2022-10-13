import { Box as MuiBox } from '@mui/material';
import { styled as MStyled } from '@mui/system';

export const Container = MStyled(MuiBox)({
  //position: 'absolute',
  height: '100%',
  //width: '100%',
  //backgroundColor: '#456',
  color: '#ddd',
}) as typeof MuiBox;
