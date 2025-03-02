
import { toast } from '@/hooks/use-toast';

export function showToastMessage(title: string, message: string) {
  toast({
    title: title,
    description: message,
    duration: 5000,
  });
}

// 필드 포커스를 처리하는 공통 함수
export const focusField = (fieldName: string) => {
  setTimeout(() => {
    // 필드 이름에 해당하는 입력 요소 찾기
    const inputElement = document.querySelector(`input[name="${fieldName}"], 
                                                [role="radiogroup"][id="${fieldName}"], 
                                                [id="${fieldName}"]`);
    
    if (inputElement) {
      // 요소가 존재하면 해당 요소로 스크롤 및 포커스
      (inputElement as HTMLElement).scrollIntoView({ 
        behavior: "smooth", 
        block: "center" 
      });
      
      // 입력 필드의 경우 포커스도 설정
      if ('focus' in inputElement) {
        (inputElement as HTMLElement).focus();
      }
    }
  }, 0);
};
