export enum LsKey {
  AUTH = 'auth',
  DEFAULT_THEME = 'default-theme',
  SIDEBAR = 'sidebar',
  MNEUS = 'default-menus',
  REGISTER = 'register',
}

export enum ExpKey {
  HALF_HOUR = 60 * 60 * 0.5 * 1000,
  HOUR = 60 * 60 * 1 * 1000,
  HOUR_DAY = 60 * 60 * 12 * 1000,
  DAY = 60 * 60 * 24 * 1000,
}

export function set(key: LsKey, data: any) {
  const time = Date.now();
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      time,
    }),
  );
}

export function get(key: LsKey, exp: ExpKey | number = -1) {
  let data: any = localStorage.getItem(key);
  if (!data) {
    return null;
  }
  try {
    data = JSON.parse(data);
    if (exp === -1) {
      data = data.data;
      return data;
    }
    if (Date.now() - data.time > exp) {
      localStorage.removeItem(key);
      return null;
    }
    data = data.data;
    return data;
  } catch (error) {
    return null;
  }
}
