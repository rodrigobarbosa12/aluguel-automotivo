interface Response {
  message: string;
  code: number;
}

const ExceptionError = (message: string, code: number): Response => Object
  .assign(new Error(), {
    message,
    code,
  });

export default ExceptionError;
