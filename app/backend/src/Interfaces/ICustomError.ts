interface ICustomError extends Error {
  statusCode?: number;
  status?: string;
  message: string;
}

export default ICustomError;
