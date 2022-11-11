export const ItemTypes = {
  BOX: 'box',
};

export interface DragItem {
  type: string;
  id: string;
  top: number;
  left: number;
}
