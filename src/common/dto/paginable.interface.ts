export interface Paginable<T> {
  data: T[];
  totalCount: number;
  count: number;
  page: number;
}
