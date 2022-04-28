/* eslint-disable prettier/prettier */
import Cookies from 'js-cookie';

const USER_INFO_TID = 'key:tid';
const USER_INFO_TOKEN = 'key:token';
const USER_PERMISSION_KEY = 'key:permission';

const tools = {
  getTid(): string | undefined {
        return Cookies.get(USER_INFO_TID);
    },
    setTid(tid: string): void {
    Cookies.set(USER_INFO_TID, tid);
    },
    setAuthor(author: string[] | null): void {
        if (author == null) {
            return;
        }
        const val = JSON.stringify(author);
        sessionStorage.setItem(USER_PERMISSION_KEY, val);
    },
    getAuthor(): string[] | null {
        const val = sessionStorage.getItem(USER_PERMISSION_KEY)
        if (val == null) {
            return null
        }
        return (JSON.parse(val) as string[])
    },
    getToken() {
        return Cookies.get(USER_INFO_TOKEN)
    }
}

export default tools