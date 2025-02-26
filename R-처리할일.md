# dalcom prj01

## 처리 사항
- [ ] : 그리드 싱글 선택, 멀티 선택 옵션으로 빼기
- [ ] : 페이징 처리 그리드 작성

## 에러 사항
- [X] : 화면이 작아지면 다른 메뉴바 클릭시 워닝 발생, 확인 또지 메뉴 제거 검토
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
