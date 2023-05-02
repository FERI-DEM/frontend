export interface ApiError {
  error: string;
  method: string;
  path: string;
  statusCode: number;
  timestamp: string;
}
