const mapStatusHTTP = (status: string): number => {
  switch (status) {
    case 'SUCCESSFUL':
      return 200;
    case 'NOT_FOUND':
      return 404;
    case 'BAD_REQUEST':
      return 400;
    case 'INTERNAL_SERVER_ERROR':
      return 500;
    default:
      return 500;
  }
};

export default mapStatusHTTP;
