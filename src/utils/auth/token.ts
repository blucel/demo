import { setCookie, getCookie, removeCookie } from '../cache/cookie'
import { encodeBase64, decodeBase64 } from '../base64'

const TOKEN_NAME = '_yuan_auth'

export const setTokenCache = (tokens: {}, expires = 86399) => {
  const token = encodeBase64(JSON.stringify(tokens))
  setCookie(TOKEN_NAME, token, expires, 'seconds')
}

export const getTokenCache = () => {
  const token = getCookie(TOKEN_NAME)
  if (token) {
    return JSON.parse(decodeBase64(token))
  }
  return {}
}

export const getTokenValueCache = () => {
  const { access_token = '' } = getTokenCache()
  return access_token
}

export const getTokenTypeCache = () => {
  const { token_type = '' } = getTokenCache()
  return token_type
}

export const removeTokeCache = () => {
  removeCookie(TOKEN_NAME)
}

