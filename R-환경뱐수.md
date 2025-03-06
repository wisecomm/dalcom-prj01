권장 설정 방식
다음과 같은 파일 구조를 사용하여 환경 설정을 관리하는 것이 좋습니다:

.env: 모든 환경에서 공통으로 사용되는 기본 환경 변수
.env.development: 개발 환경에서만 사용하는 환경 변수
.env.production: 운영 환경에서만 사용하는 환경 변수
.env.local: 로컬에서 개인적으로 오버라이드하는 환경 변수 (Git에 포함되지 않음)
.env.development.local: 로컬 개발 환경에서만 오버라이드하는 환경 변수
.env.production.local: 로컬 운영 환경에서만 오버라이드하는 환경 변수

.env.local 샘플
NEXT_PUBLIC_SUPABASE_URL=https://jchouoylynpyfhymegef.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=kk
NEXT_PUBLIC_BASE_URL=http://192.168.100.123/astro-v2
STORAGE_USER_ENCRYPTION_KEY=12345678901234567890123456789012
