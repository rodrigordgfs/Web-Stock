export interface IColumn {
    name: string;
    label: string;
    align?: string;
    width?: string;
    sortable?: boolean;
    required?: boolean;
    field: (row: any) => string;
    format?: (value: any) => string;
    sort?: (a: any, b: any) => number;
  }