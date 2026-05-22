# 와이엠미디어 토스 심사용 미니 사이트

토스페이먼츠 가맹점 심사 통과를 위한 최소 페이지 7장. 순수 HTML/CSS/JS, 빌드 X, 의존성 X.

## 파일 구성

| 파일 | 용도 |
|---|---|
| `index.html` | 메인 (회사 소개 + 상품 1개 + 푸터 필수 정보) |
| `checkout.html` | 결제 페이지 (토스 SDK + 입력 폼 + 약관 동의) |
| `payment-success.html` | 결제 성공 |
| `payment-fail.html` | 결제 실패 |
| `terms.html` | 이용약관 |
| `privacy.html` | 개인정보처리방침 |
| `refund.html` | 환불정책 |
| `contact.html` | 고객 문의 (FAQ 포함) |

## 토스 심사 체크리스트

- [x] 푸터 필수 정보 (상호/대표/사업자번호/통신판매업/주소/전화/이메일)
- [x] 이용약관
- [x] 개인정보처리방침
- [x] 환불정책 (배송·교환·환불 명시)
- [x] 판매 상품 1개 (이미지·가격·상세 설명)
- [x] 결제 흐름 (토스 SDK 실제 호출, 테스트 키)
- [x] 상품 상세에 배송/교환/환불 명시

## 배포 방법 (가장 빠른 순)

### A. Vercel (드래그앤드롭, 1분)

1. https://vercel.com 로그인
2. 우측 상단 "Add New..." → "Project"
3. **"Deploy without Git"** 또는 폴더 드래그
4. 이 폴더(`ymmedia-site/`) 전체 드래그
5. 도메인 자동 할당됨 → Settings → Domains에서 `ymmedia.co.kr` 연결

### B. 기존 `ymmedia-frontend` 저장소 활용 (Vercel 자동)

1. `ymmedia-frontend` 저장소를 **이 파일들로 완전히 교체**
2. `vercel.json`, `next.config.ts`, `package.json` 등 **다 삭제**
3. 이 HTML 7개만 루트에 두기
4. git push → Vercel이 정적 사이트로 자동 인식 (빌드 명령 없음)

### C. GitHub Pages (Vercel 안 쓰고)

1. 새 저장소 `ymmedia-pages` 만들고 이 파일들 push
2. Settings → Pages → Source: main branch / root → Save
3. Cloudflare DNS에서 ymmedia.co.kr → GitHub Pages CNAME 연결

## 결제 테스트 방법

1. https://ymmedia.co.kr/checkout.html 접속
2. 이름/전화/생년월일 입력
3. 약관 3개 모두 체크
4. ₩9,900 결제하기 클릭
5. 토스 결제창 열림 → 테스트 카드 정보 입력
   - 카드번호: `4330-1234-1234-1234`
   - 유효기간: 임의 (예: 12/30)
   - CVC: 임의 (예: 123)
   - 비밀번호 앞 2자리: 임의 (예: 12)
   - 생년월일/사업자번호: 임의
6. 결제 성공 → `/payment-success.html` 이동

## 토스 심사 신청 시 제출 정보

- **사이트 주소**: https://www.ymmedia.co.kr/
- **결제 페이지 URL**: https://www.ymmedia.co.kr/checkout.html
- **상품 페이지 URL**: https://www.ymmedia.co.kr/#product
- **약관 페이지**: https://www.ymmedia.co.kr/terms.html
- **개인정보**: https://www.ymmedia.co.kr/privacy.html
- **환불정책**: https://www.ymmedia.co.kr/refund.html

## 주의사항

- 모든 파일은 **UTF-8 (BOM 없음)** 으로 저장됨
- 토스 키는 **테스트 키만** 박혀있음 (`test_ck_5OWRapdA8dJeyYKg21JXVo1zEqZK`)
- 라이브 키 전환은 토스 심사 통과 후
- 백엔드 연동 없음 (정적 사이트만)
- successUrl/failUrl이 같은 도메인 페이지로 설정되어 있음
