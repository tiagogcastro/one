export type ApiError = {
  messages: string[];
};

export function apiError(error: any): ApiError {
  let err: ApiError;

  if (error.response?.data.message) {
    const message = error.response.data.message;

    err = {
      messages: [message],
    };
  } else {
    const _error = error.response?.data.error;

    err = {
      messages: [_error],
    };
  }

  return err;
}
