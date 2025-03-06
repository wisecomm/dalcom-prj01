// 암호화된 localStorage 커스텀 스토리지

// 암호화에 필요한 기능이 담긴 CryptoJS 설치 필요:
// npm install crypto-js
// npm install --save-dev @types/crypto-js
import CryptoJS from "crypto-js";

// 암호화 키 (실제 사용시에는 환경 변수에서 가져오는 것이 좋습니다)
const ENCRYPTION_KEY =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "my-encryption-key";

const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

const decryptData = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// 암호화된 localStorage 구현
const encryptedStorage = {
  getItem: (name: string) => {
    // 서버 사이드 렌더링 중인지 확인
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const encryptedData = localStorage.getItem(name);
      if (!encryptedData) {
        return null;
      }

      // 암호화된 데이터 복호화
      return decryptData(encryptedData);
    } catch (error) {
      console.warn(`Error reading from localStorage:`, error);
      return null;
    }
  },

  setItem: (name: string, value: string) => {
    // 서버 사이드 렌더링 중인지 확인
    if (typeof window === "undefined") {
      return;
    }

    try {
      // 데이터 암호화 후 저장
      const encryptedData = encryptData(value);
      localStorage.setItem(name, encryptedData);
    } catch (error) {
      console.warn(`Error writing to localStorage:`, error);
    }
  },

  removeItem: (name: string) => {
    // 서버 사이드 렌더링 중인지 확인
    if (typeof window === "undefined") {
      return;
    }

    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.warn(`Error removing from localStorage:`, error);
    }
  },
};

export default encryptedStorage;
