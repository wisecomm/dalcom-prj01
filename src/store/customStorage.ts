// 브라우저 환경에서만 localStorage에 접근하는 커스텀 스토리지
const customStorage = {
  getItem: (name: string) => {
    // 서버 사이드 렌더링 중인지 확인
    if (typeof window === "undefined") {
      return null;
    }
    try {
      return localStorage.getItem(name);
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
      localStorage.setItem(name, value);
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

export default customStorage;
