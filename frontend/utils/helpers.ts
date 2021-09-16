import { AxiosError } from 'axios'

function errorMessageFromResponse(errorResponse: AxiosError<any>) {
  const messageArray = errorResponse?.response?.data.message

  return Array.isArray(messageArray)
    ? messageArray[0].messages[0].message
    : errorResponse.response?.data.message ||
        'Something went wrong. Please contact a community administrator'
}

export { errorMessageFromResponse }
