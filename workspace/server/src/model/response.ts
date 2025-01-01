interface ServerResponse<T> {
  code: number
  data: T
  message: string
}

export function OK<T>(data: T, message: string = 'success'): ServerResponse<T> {
  return {
    code: 200,
    data,
    message,
  }
}

export function ERROR<T>(data: T, message: string = 'error'): ServerResponse<T> {
  return {
    code: 500,
    data,
    message,
  }
}

const Response = { OK, ERROR }

export default Response