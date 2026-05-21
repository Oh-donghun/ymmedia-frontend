import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: 'YM미디어 개인정보처리방침',
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="개인정보처리방침"
      subtitle={`${COMPANY.name}(이하 '회사')는 정보주체의 개인정보를 중요시하며, 「개인정보 보호법」을 준수하기 위하여 노력하고 있습니다.`}
      effectiveDate="2026년 5월 19일"
    >
      <h2>제1조 (개인정보의 처리 목적)</h2>
      <p>회사는 다음의 목적을 위하여 개인정보를 처리하며, 다음의 목적 이외의 용도로는 이용하지 않습니다.</p>
      <ol>
        <li><strong>서비스 제공</strong> — 사주 풀이 콘텐츠 제공, 본인 인증, 결제 처리, 풀이 결과 발송</li>
        <li><strong>고객 응대</strong> — 고객 문의 처리, 환불·취소 요청 응대, 분쟁 조정을 위한 기록 보존</li>
        <li><strong>서비스 개선</strong> — 서비스 이용 통계 분석, 신규 서비스 개발</li>
        <li><strong>법적 의무 이행</strong> — 전자상거래법, 통신비밀보호법 등 관계 법령에서 정한 의무 이행</li>
      </ol>

      <h2>제2조 (수집하는 개인정보 항목)</h2>
      <p>회사는 다음과 같은 개인정보를 수집합니다.</p>

      <h3>1. 필수 수집 항목</h3>
      <ul>
        <li><strong>사주 풀이 신청 시</strong> — 이름, 생년월일, 출생 시간, 성별, 휴대전화번호</li>
        <li><strong>결제 시</strong> — 결제 수단 정보(카드사 / 은행명), 결제 승인 번호</li>
        <li><strong>자동 수집</strong> — 접속 IP, 접속 일시, 서비스 이용 기록, 쿠키, 기기 정보</li>
      </ul>

      <h3>2. 선택 수집 항목</h3>
      <ul>
        <li><strong>이메일 주소</strong> — 풀이 결과 추가 발송, 고객 응대용</li>
        <li><strong>카카오톡 ID</strong> — 알림톡 발송용</li>
      </ul>

      <div className="notice-box gold">
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.9 }}>
          <strong>※ 안내</strong> — 본 서비스는 사주 풀이를 위해 생년월일과 출생 시간이 반드시 필요합니다. 출생 시간을 모르시는 경우, 정오(12시)를 기준으로 풀이가 진행됩니다.
        </p>
      </div>

      <h2>제3조 (개인정보의 처리 및 보유 기간)</h2>
      <p>회사는 개인정보의 수집·이용 목적이 달성되면 지체 없이 파기합니다. 단, 관계 법령에 의해 보존할 필요가 있는 경우 다음과 같이 일정 기간 보관합니다.</p>

      <table>
        <thead>
          <tr><th>보관 항목</th><th>보관 기간</th><th>근거 법령</th></tr>
        </thead>
        <tbody>
          <tr><td>계약 또는 청약철회 등에 관한 기록</td><td>5년</td><td>전자상거래법</td></tr>
          <tr><td>대금결제 및 재화 등의 공급에 관한 기록</td><td>5년</td><td>전자상거래법</td></tr>
          <tr><td>소비자의 불만 또는 분쟁처리에 관한 기록</td><td>3년</td><td>전자상거래법</td></tr>
          <tr><td>접속에 관한 기록 (로그 기록, IP)</td><td>3개월</td><td>통신비밀보호법</td></tr>
          <tr><td>사주 풀이 결과 데이터</td><td>발송 후 즉시 파기 (재발송 요청 시 30일 보관)</td><td>이용자 보호</td></tr>
        </tbody>
      </table>

      <h2>제4조 (개인정보의 제3자 제공)</h2>
      <p>회사는 정보주체의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
      <ul>
        <li>정보주체가 사전에 동의한 경우</li>
        <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
      </ul>

      <h2>제5조 (개인정보 처리의 위탁)</h2>
      <p>회사는 원활한 서비스 제공을 위하여 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다.</p>
      <table>
        <thead>
          <tr><th>수탁업체</th><th>위탁 업무 내용</th><th>보유 및 이용 기간</th></tr>
        </thead>
        <tbody>
          <tr><td>토스페이먼츠 주식회사</td><td>결제 처리 및 본인 인증</td><td>회원 탈퇴 또는 위탁 종료 시까지</td></tr>
          <tr><td>주식회사 솔라피</td><td>카카오톡 알림톡 발송</td><td>발송 완료 후 즉시 파기</td></tr>
          <tr><td>Google Cloud (한국 리전)</td><td>서버 운영 및 데이터 저장</td><td>회원 탈퇴 또는 위탁 종료 시까지</td></tr>
        </tbody>
      </table>

      <h2>제6조 (정보주체의 권리·의무 및 행사 방법)</h2>
      <p>정보주체는 회사에 대해 언제든지 다음의 권리를 행사할 수 있습니다.</p>
      <ol>
        <li>개인정보 열람 요구</li>
        <li>오류 등이 있을 경우 정정 요구</li>
        <li>삭제 요구</li>
        <li>처리정지 요구</li>
      </ol>
      <p>위 권리 행사는 이메일({COMPANY.email}) 또는 전화({COMPANY.phone})로 요청하실 수 있으며, 회사는 지체 없이 조치하겠습니다.</p>

      <h2>제7조 (개인정보의 파기)</h2>
      <p>회사는 개인정보 보유 기간이 경과하거나 처리 목적이 달성된 경우 지체 없이 개인정보를 파기합니다.</p>
      <ul>
        <li><strong>전자적 파일 형태</strong> — 복구 및 재생이 불가능한 방법으로 영구 삭제</li>
        <li><strong>종이 문서 형태</strong> — 분쇄기로 분쇄하거나 소각</li>
      </ul>

      <h2>제8조 (개인정보의 안전성 확보 조치)</h2>
      <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
      <ul>
        <li>개인정보 취급 직원의 최소화 및 정기적 교육</li>
        <li>개인정보에 대한 접근 제한 및 접근 권한 관리</li>
        <li>개인정보의 암호화 저장 및 전송</li>
        <li>해킹 등에 대비한 기술적 대책 (방화벽, 침입 차단 시스템)</li>
        <li>HTTPS(SSL) 암호화 통신 적용</li>
      </ul>

      <h2>제9조 (쿠키의 운영 및 거부)</h2>
      <p>회사는 이용자의 편의를 위해 쿠키를 사용할 수 있습니다. 이용자는 브라우저 옵션을 설정함으로써 쿠키 저장을 거부할 수 있으나, 일부 서비스 이용에 제한이 있을 수 있습니다.</p>

      <h2>제10조 (개인정보 보호책임자)</h2>
      <div className="notice-box">
        <p style={{ margin: '0 0 8px', fontSize: 15 }}><strong>개인정보 보호책임자</strong></p>
        <p style={{ margin: '0', fontSize: 14, lineHeight: 1.9 }}>
          성명: {COMPANY.ceo} (대표)<br/>
          이메일: <a href={`mailto:${COMPANY.email}`} style={{ color: 'var(--gold-light)' }}>{COMPANY.email}</a><br/>
          연락처: {COMPANY.phone}
        </p>
      </div>

      <h2>제11조 (권익침해 구제방법)</h2>
      <p>개인정보 침해로 인한 신고나 상담이 필요하신 경우 아래 기관에 문의하시기 바랍니다.</p>
      <ul>
        <li>개인정보분쟁조정위원회 — 1833-6972 (www.kopico.go.kr)</li>
        <li>개인정보침해신고센터 — 118 (privacy.kisa.or.kr)</li>
        <li>대검찰청 사이버수사과 — 1301 (www.spo.go.kr)</li>
        <li>경찰청 사이버수사국 — 182 (ecrm.cyber.go.kr)</li>
      </ul>

      <h2>제12조 (개인정보처리방침의 변경)</h2>
      <p>본 개인정보처리방침은 시행일로부터 적용되며, 법령 또는 회사 정책의 변경이 있을 경우 변경 사항을 홈페이지에 공지합니다.</p>
    </LegalLayout>
  );
}
