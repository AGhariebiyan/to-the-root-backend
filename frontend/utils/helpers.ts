import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedDate from 'dayjs/plugin/localizedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import readingTime from 'reading-time'
dayjs.extend(relativeTime)
dayjs.extend(localizedDate)
dayjs.extend(customParseFormat)

function errorMessageFromResponse(errorResponse: AxiosError<any>) {
  const messageArray = errorResponse?.response?.data.message

  return Array.isArray(messageArray)
    ? messageArray[0].messages[0].message
    : errorResponse.response?.data.message ||
    'Something went wrong. Please contact a community administrator'
}

function readableTimeDifference(timeStamp: string) {
  const date = new Date(timeStamp)
  return dayjs(date).fromNow()
}

function formatDate(strapiDate: string) {
  const date = new Date(strapiDate)
  return dayjs(date).format("DD.MM.YYYY")
}

function estimateReadingTime(text: string) {
  return readingTime(text)
}

function composePageTitle(page: string) {
  return `/ ${page}`
}

export { errorMessageFromResponse, readableTimeDifference, formatDate, estimateReadingTime, composePageTitle }
