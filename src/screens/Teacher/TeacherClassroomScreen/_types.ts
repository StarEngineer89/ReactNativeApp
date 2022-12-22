export type ListProps = {
  data: any[];
  showList: boolean;
  showEdit: boolean;
  showAdd: boolean;
  onPressItem: (item: any) => void;
  onEdit: () => void;
  onAdd?: () => void;
  onConfirmTutorial: () => void;
};
