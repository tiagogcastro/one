import { Box } from '@mui/material';
import type { XYCoord } from 'react-dnd';
import { useDrop } from 'react-dnd';

import { DragItem } from './types';

export interface ContainerProps {
  children: React.ReactNode;
  moveItems: (id: any, posX: number, posY: number) => void;
}

export interface ContainerState {
  id: string;
  posY: number;
  posX: number;
  title: string;
}

export function DragDropContainer({ children, moveItems }: ContainerProps) {
  const [, drop] = useDrop(
    () => ({
      accept: 'box',
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        let posX = Math.round(item.left + delta.x);
        let posY = Math.round(item.top + delta.y);

        if (posX < 0) {
          posX = 0;
        }

        if (posY < 0) {
          posY = 0;
        }

        moveItems(item.id, posX, posY);
        return undefined;
      },
    }),
    [moveItems],
  );

  return (
    <Box ref={drop} height="calc(100vh - 80px)" overflow="auto" position="relative">
      {children}
    </Box>
  );
}
