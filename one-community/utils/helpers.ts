function errorMessageFromResponse(errorResponse: any) {
  return errorResponse.response.data.message[0].messages[0].message
}

export { errorMessageFromResponse }
