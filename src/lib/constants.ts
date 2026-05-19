// YM미디어 사업자 정보 (모든 페이지 공통 참조)
export const COMPANY = {
  name: 'YM미디어',
  nameFull: '와이엠미디어',
  ceo: '서영미',
  bizNumber: '253-13-02733',
  ecommerceNumber: '신청 중',
  address: '부산광역시 서구 대영로38번길 11, 103동 1601호',
  addressDetail: '서대신동1가, 대신푸르지오',
  phone: '010-2564-7096',
  email: 'ymmedia40@gmail.com',
  domain: 'ymmedia.co.kr',
} as const;

export const BRAND_UNSEDANG = {
  name: '운세당',
  nameHanja: '運勢堂',
  description: '사주 명리 기반 운세 풀이 서비스',
  basePath: '/unsedang',
} as const;

// 첫 상품
export const PRODUCT_JAEMUL = {
  code: 'JAEMUL_FULL',
  name: '재물 풀이',
  nameHanja: '財物 풀이',
  price: 19800,
  priceLabel: '₩19,800',
  duration: '약 15분 분량',
  description: '당신의 사주 팔자에 새겨진 8가지 재물의 길을 풀어드립니다.',
  axes: [
    { code: 'J1', label: '돈 그릇', desc: '얼마나 큰 그릇으로 태어났는가' },
    { code: 'J2', label: '돈 누수', desc: '어디로 돈이 새는가' },
    { code: 'J3', label: '돈 벌이', desc: '어떻게 벌어야 가장 잘 버는가' },
    { code: 'J4', label: '돈 타이밍', desc: '언제 큰 재물이 들어오는가' },
    { code: 'J5', label: '돈 체질', desc: '어떤 투자가 잘 맞는가' },
    { code: 'J6', label: '돈 인연', desc: '누구와 함께해야 부자 되는가' },
    { code: 'J7', label: '돈 노후', desc: '말년 재물 운' },
    { code: 'J8', label: '돈 방어', desc: '재물 위기를 어떻게 피할 것인가' },
  ],
} as const;
