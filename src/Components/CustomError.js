class CustomError extends Error {
  constructor(name, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = name;
    this.date = new Date();
  }
}

export default CustomError;
