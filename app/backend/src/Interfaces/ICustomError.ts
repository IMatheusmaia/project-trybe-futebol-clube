interface ICustomError extends Error {
  statusCode?: number;
  message: string;
}

export default ICustomError;
