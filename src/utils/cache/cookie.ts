// @ts-nocheck
import Cookies from 'js-cookie'

type timeUnit = 'seconds' | 'hours' | 'days' 

export const setCookie = (name: string, value: string, time: number, timeUnit: timeUnit = 'hours' ) => {
  let _time = ''
  if (timeUnit === 'seconds') {
    _time = new Date(new Date() * 1 + time * 1000)
  }
  if (timeUnit === 'hours') {
    _time = new Date(new Date().getTime() + time * 60 * 60 * 1000);
  }
  if (timeUnit === 'days') {
    _time = time
  }
  Cookies.set(name, value, {
    expires: _time
  })
}

export const getCookie = (name: string) => {
  return Cookies.get(name)
}

export const removeCookie = (name: string) => {
  Cookies.remove(name)
}
