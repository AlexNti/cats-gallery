export type Breed = {
  id: number;
  name: string;
  life_span: string;
  energy_level: number;
  intelligence: number;
  origin: string;
  health_issues: number;
  child_friendly: number;
  weight: {
    imperial: string;
    metric: string;
  };
};

export type Category = {
  id: number;
  name: string;
};

export type CatImage = {
  id: string;
  url: string;
  width?: number;
  height?: number;
  mime_type?: string;
  breeds?: Breed[];
  categories?: Category[];
};

export type CatFavourites = {
  id: string;
  image_id: string;
  sub_id: string;
  created_at: string;
  image: CatImage;
  user_id: string;
};

export type ApiResponse<T> = {
  data: T;
  status: number;
  ok: boolean;
  error: null;
};

export type ApiErrorResponse = {
  data: null;
  status: number;
  ok: boolean;
  error: { message: string; stack?: string };
};

export type ApiSuccessOrError<T> = ApiResponse<T> | ApiErrorResponse;
