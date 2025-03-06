import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
//import customStorage from "./customStorage";
import encryptedStorage from "./encryptedStorage";

export interface userInfo {
  id: string;
  email: string;
  name: string;
  role: string;
  token: string;
}

interface userInfoProps {
  isLogin: boolean; // 로그인 여부
  user: userInfo | null; // 유저 정보
  token: string | null; // 토큰
  saveUser: (user: userInfo) => void; // 유저 정보 저장
  logout: () => void; // 로그아웃
}

export const useUserStore = create(
  persist<userInfoProps>(
    (set) => {
      return {
        isLogin: false,
        user: null,
        token: null,

        saveUser: (user) => {
          set({ user, isLogin: true, token: user.token });
        },

        logout: () => {
          set({ user: null, isLogin: false, token: null });
          encryptedStorage.removeItem("authStore");
        },
      };
    },
    {
      name: "authStore",
      // 커스텀 스토리지 어댑터 사용
      storage: createJSONStorage(() => encryptedStorage),
      //      storage: createJSONStorage(() => customStorage),
    }
  )
);
