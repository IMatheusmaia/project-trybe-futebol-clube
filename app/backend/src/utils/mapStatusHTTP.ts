const mapStatusHTTP = (status: string): number => {
  switch (status) {
    case 'SUCCESSFUL':
      return 200;
    case 'CREATED':
      return 201;
    case 'NOT_FOUND':
      return 404;
    case 'BAD_REQUEST':
      return 400;
    case 'CONFLICT':
      return 409;
    default:
      return 500;
  }
};

export default mapStatusHTTP;
