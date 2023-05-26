export interface NotFoundErrorStructure {
  statusCode: number;
  message: string;
  publicMessage?: string;
}

export interface UnauthorizedErrorStructure {
  statusCode: number;
  message: string;
  publicMessage?: string;
}

export interface GeneralErrorStructure {
  statusCode: number;
  message: string;
  publicMessage?: string;
}

export interface OkResponseStructure {
  statusCode: number;
  message: string;
  publicMessage?: string;
}
