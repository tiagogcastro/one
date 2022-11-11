import { Box } from '@mui/system';
import { useDrag } from 'react-dnd';

import { ItemTypes } from './types';

const style: React.CSSProperties = {
  position: 'absolute',
  cursor: 'move',
};

export interface BoxProps {
  id: any;
  posX: number;
  posY: number;
  children?: React.ReactNode;
}

export function DragDropItem({ id, posX, posY, children }: BoxProps) {
  const [_, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left: posX, top: posY },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, posX, posY],
  );

  return (
    <Box ref={drag} style={{ ...style, left: posX, top: posY }} data-testid="box">
      {children}
    </Box>
  );
}
