export interface ApiRespone<T> {
  code: number;
  message: string;
  data: T;
}

export interface Page<T> {
  pageIndex: number;
  pageSize: number;
  total: number;
  content: T[];
}
