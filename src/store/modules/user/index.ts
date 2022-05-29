import { defineStore } from 'pinia';
import {
  login as userlogin,
  logout as userlogout,
  getUserInfo,
  LoginData,
  logout,
} from '@/services/user';
import { setToken, clearToken, setTid, setAuthor, getTid } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    role: '',
    permission: null,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();
      setAuthor(res.permission);
      this.setInfo(res);
    },

    async mustTid() {
      const tid = getTid();
      if (tid === null) {
        await logout();
        window.location.reload();
        return null;
      }
      return tid;
    },

    // Login
    async login(tid: string, loginForm: LoginData) {
      try {
        const data = (await userlogin(tid, loginForm)) as any;
        setToken(data.token);
        setTid(data.tid);
        setAuthor(data.permission);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // Logout
    async logout() {
      this.resetInfo();
      clearToken();
      removeRouteListener();
    },
  },
});

export default useUserStore;
