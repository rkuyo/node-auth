import * as jwt from "jsonwebtoken"
const tokenKey = "access_token"
let cached = ""

export const getToken = (): string | null => {
  if (cached) return cached
  const token = localStorage.getItem(tokenKey)
  return token
}

export const setToken = (token: string) => {
  cached = token
  localStorage.setItem(tokenKey, token)
}

export const clearToken = () => {
  cached = ""
  localStorage.removeItem(tokenKey)
}

export const isValid = (token: string) => {
  const payload = jwt.decode(token)

  if (!payload || typeof payload === "string") return false

  const valid = payload.exp * 1000 > Date.now()
  return valid
}
