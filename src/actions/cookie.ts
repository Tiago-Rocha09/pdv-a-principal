import Cookies from 'js-cookie'

export function setCookie(name: string, value: string) {
  return Cookies.set(name, value, { expires: 30 });
}

export function deleteCookie(name: string) {
  return Cookies.remove(name);
}
