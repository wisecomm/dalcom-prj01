# dalcom prj01

## 처리 사항

- [x] : 그리드 싱글 선택, 멀티 선택 옵션으로 빼기
- [x] : 페이징 처리 그리드 작성
- [ ] : 로그인 화면 추가
- [ ] : 입력 화면, 테이블 화면 구체화
- [ ] : 로그인정보 스토리지 추가(서버 타임 아웃 처리로 스토리지 로그아웃 처리)
- [ ] : JTOKEN 처리 스프링부트 서버 만들기

## 에러 사항

- [x] : 화면이 작아지면 다른 메뉴바 클릭시 워닝 발생, 확인 또지 메뉴 제거 검토
- [ ] : XXXX

## vercle 배포 수정사항

vercle 인스톨 메뉴에 추가 (install command) : npm install --legacy-peer-deps

- use-toast.ts 수정  
  type Action =
  | {
  type: ActionType["ADD_TOAST"]
  toast: ToasterToast
  }
  | {
  type: ActionType["UPDATE_TOAST"]
  toast: Partial<ToasterToast>
  }
  | {
  type: ActionType["DISMISS_TOAST"]
  toastId?: ToasterToast["id"]
  }
  | {
  type: ActionType["REMOVE_TOAST"]
  toastId?: ToasterToast["id"]
  }

- eslint.config.mjs 수정 : 필요한지는 한번 더 확인
  const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
  rules: {
  "no-unused-vars": "off", // Turn off the base rule as it can report incorrect errors
  "@typescript-eslint/no-unused-vars": ["error"], // Treat unused variables as errors
  },
  },
  ];
