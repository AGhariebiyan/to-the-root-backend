import { AxiosError } from 'axios'
import { ErrorResponse } from './types'

function errorMessageFromResponse(errorResponse: AxiosError<ErrorResponse>) {
  if (Array.isArray(errorResponse.response))
    return errorResponse?.response.data.message[0].messages[0].message // WV 20210812 this is not fool-proof but probably good enough
  return (
    errorResponse.response?.data.message ||
    'Something went wrong. Please contact a community administrator'
  )
}

export { errorMessageFromResponse }
