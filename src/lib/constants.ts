// ============================================================
// 운세당 프론트엔드 공통 상수
// 사업자 정보·결제 모드·데모 배너는 모두 환경변수로 분기
// 운세당(나를읽다) vs 운세당(와이엠) 표기 절대 혼동 금지
// ============================================================

// ----- 브랜드 식별 -----
// 'naread' = 운세당(나를읽다, readmelab.co.kr/unsedang)
// 'ymmedia' = 운세당(와이엠, ymmedia.co.kr/unsedang)
export const BRAND_ID = (process.env.NEXT_PUBLIC_BRAND ?? 'naread') as
  | 'naread'
  | 'ymmedia';

// ----- 결제 모드 -----
// 'live' = 실제 결제 (운세당(나를읽다))
// 'test' = 테스트 결제 (운세당(와이엠), 토스 심사 통과 전)
export const PAYMENT_MODE = (process.env.NEXT_PUBLIC_PAYMENT_MODE ?? 'live') as
  | 'live'
  | 'test';

// ----- 데모 배너 (운세당(와이엠) 데모 모드에서만 노출) -----
export const DEMO_BANNER = process.env.NEXT_PUBLIC_DEMO_BANNER ?? '';

// ----- 사업자 정보 (환경변수로 브랜드별 분기) -----
export const COMPANY = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? '나를읽다연구소',
  ceo: process.env.NEXT_PUBLIC_COMPANY_CEO ?? '오동훈',
  bizNumber: process.env.NEXT_PUBLIC_COMPANY_BIZ_NUMBER ?? '347-12-03156',
  ecommerceNumber:
    process.env.NEXT_PUBLIC_COMPANY_ECOMMERCE_NUMBER ?? '제2026-부산서구-0040호',
  address:
    process.env.NEXT_PUBLIC_COMPANY_ADDRESS ??
    '부산광역시 서구 대영로38번길 11, 103동 1601호',
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE ?? '010-9847-1152',
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? 'abkomp400@gmail.com',
  domain:
    BRAND_ID === 'ymmedia' ? 'ymmedia.co.kr' : 'readmelab.co.kr',
} as const;

// ----- 운세당 브랜드 메타 -----
export const BRAND_UNSEDANG = {
  name: '운세당',
  nameHanja: '運勢堂',
  description: '사주 명리 기반 운세 풀이 서비스',
  basePath: '/unsedang',
} as const;

// ----- API 베이스 -----
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'https://ymmedia-server-svwkzchhha-du.a.run.app';

// ----- 토스 클라이언트 키 (브랜드별 분기) -----
export const TOSS_CLIENT_KEY =
  process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ?? '';

// ============================================================
// 상품 정의 (PRODUCT_JAEMUL 폐기, J1~J8 단독 + 종합 + 질문권)
// 가격 최종 결정은 백엔드 (src/config/products.js)에서만
// 프론트는 표시용
// ============================================================

// 8개 퍼널 (J1~J8) 공통 메타
export const FUNNELS = {
  J1: { code: 'J1', label: '돈 그릇', desc: '얼마나 큰 그릇으로 태어났는가' },
  J2: { code: 'J2', label: '돈 누수', desc: '어디로 돈이 새는가' },
  J3: { code: 'J3', label: '돈 벌이', desc: '어떻게 벌어야 가장 잘 버는가' },
  J4: { code: 'J4', label: '돈 타이밍', desc: '언제 큰 재물이 들어오는가' },
  J5: { code: 'J5', label: '돈 체질', desc: '어떤 투자가 잘 맞는가' },
  J6: { code: 'J6', label: '돈 인연', desc: '누구와 함께해야 부자 되는가' },
  J7: { code: 'J7', label: '돈 노후', desc: '말년 재물 운' },
  J8: { code: 'J8', label: '돈 방어', desc: '재물 위기를 어떻게 피할 것인가' },
} as const;

export type FunnelCode = keyof typeof FUNNELS;

// 단독 풀이 상품 (J1~J8, 각 ₩14,900 회원 / ₩19,900 비회원, 질문권 1회)
export const SINGLE_PRODUCTS = {
  J1: {
    code: 'J1_SINGLE',
    funnel: 'J1',
    name: '돈 그릇 풀이',
    priceMember: 9900,
    priceNonMember: 9900,
    credit: 1,
    duration: '약 10분 분량',
  },
  J2: {
    code: 'J2_SINGLE',
    funnel: 'J2',
    name: '돈 누수 풀이',
    priceMember: 9900,
    priceNonMember: 9900,
    credit: 1,
    duration: '약 10분 분량',
  },
  J3: {
    code: 'J3_SINGLE',
    funnel: 'J3',
    name: '돈 벌이 풀이',
    priceMember: 9900,
    priceNonMember: 9900,
    credit: 1,
    duration: '약 10분 분량',
  },
  J4: {
    code: 'J4_SINGLE',
    funnel: 'J4',
    name: '돈 타이밍 풀이',
    priceMember: 9900,
    priceNonMember: 9900,
    credit: 1,
    duration: '약 10분 분량',
  },
  J5: {
    code: 'J5_SINGLE',
    funnel: 'J5',
    name: '돈 체질 풀이',
    priceMember: 9900,
    priceNonMember: 9900,
    credit: 1,
    duration: '약 10분 분량',
  },
  J6: {
    code: 'J6_SINGLE',
    funnel: 'J6',
    name: '돈 인연 풀이',
    priceMember: 9900,
    priceNonMember: 9900,
    credit: 1,
    duration: '약 10분 분량',
  },
  J7: {
    code: 'J7_SINGLE',
    funnel: 'J7',
    name: '돈 노후 풀이',
    priceMember: 9900,
    priceNonMember: 9900,
    credit: 1,
    duration: '약 10분 분량',
  },
  J8: {
    code: 'J8_SINGLE',
    funnel: 'J8',
    name: '돈 방어 풀이',
    priceMember: 9900,
    priceNonMember: 9900,
    credit: 1,
    duration: '약 10분 분량',
  },
} as const;

// 종합 운명풀이 (8축 통합 + 평생 서사 + AI 풀이, 질문권 3회)
export const JONGMYUNG = {
  code: 'JONGMYUNG',
  name: '운세당 종합 운명풀이',
  nameHanja: '綜命',
  priceMember: 29900,
  priceNonMember: 39900,
  credit: 3,
  duration: '약 30분 분량',
  description: '당신의 사주 팔자 전체를 평생의 서사로 풀어드립니다.',
} as const;

// 추가 질문권 묶음 (회원 전용)
export const CREDIT_PACKS = {
  ONE: {
    code: 'CREDIT_1',
    name: '추가 질문권 1회',
    price: 1900,
    credit: 1,
    expireDays: 30,
  },
  THREE: {
    code: 'CREDIT_3',
    name: '추가 질문권 3회',
    price: 2900,
    credit: 3,
    expireDays: 60,
  },
} as const;

// 회원 등급 (백엔드와 동기, 표시용)
export const MEMBERSHIP_TIERS = {
  bronze: { name: '브론즈', threshold: 0, discountRate: 0 },
  silver: { name: '실버', threshold: 30000, discountRate: 0.1 },
  gold: { name: '골드', threshold: 80000, discountRate: 0.15 },
} as const;