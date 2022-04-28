const TOKEN_KEY = 'token';
const USER_INFO_TID = 'key:tid';
const USER_PERMISSION_KEY = 'key:permission';

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_INFO_TID);
  localStorage.removeItem(USER_PERMISSION_KEY);
};

const getTid = () => sessionStorage.getItem(USER_INFO_TID);

const setTid = (tid: string) => sessionStorage.setItem(USER_INFO_TID, tid);

const setAuthor = (author: string[] | null) => {
  if (author == null) {
    return;
  }
  const val = JSON.stringify(author);
  sessionStorage.setItem(USER_PERMISSION_KEY, val);
};
const getAuthor = (): string[] | null => {
  const val = sessionStorage.getItem(USER_PERMISSION_KEY);
  if (val == null) {
    return null;
  }
  return JSON.parse(val) as string[];
};

export {
  isLogin,
  getToken,
  setToken,
  clearToken,
  getTid,
  setTid,
  setAuthor,
  getAuthor,
};
