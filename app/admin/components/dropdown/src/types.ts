export interface IDropMenu {
  onClick?: Fn;
  to?: string;
  icon?: string;
  key: string | number;
  text: string;
  disabled?: boolean;
  divider?: boolean;
}