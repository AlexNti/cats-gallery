export interface Breed {
  id: number;
  name: string;
  weight: string;
  height: string;
  life_span: string;
  breed_group: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  mime_type?: string;
  breeds?: Breed[];
  categories?: Category[];
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
  error: null;
}

export interface ApiErrorResponse {
  data: null;
  status: number;
  ok: boolean;
  error: { message: string; stack?: string };
}

export type ApiSuccessOrError<T> = ApiResponse<T> | ApiErrorResponse;
