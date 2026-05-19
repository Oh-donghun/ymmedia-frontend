import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: '환불정책',
  description: 'YM미디어 환불 정책 안내',
};

export default function RefundPage() {
  return (
    <LegalLayout
      title="환불정책"
      subtitle={`${COMPANY.name}는 「전자상거래 등에서의 소비자보호에 관한 법률」에 따라 다음과 같이 환불 정책을 운영하고 있습니다.`}
      effectiveDate="2026년 5월 19일"
    >
      <h2>제1조 (환불 정책의 기본 원칙)</h2>
      <p>회사가 제공하는 사주 풀이 콘텐츠는 디지털 콘텐츠로서, 「전자상거래법 제17조」 및 「콘텐츠산업진흥법」에 따라 다음과 같이 환불 정책이 적용됩니다.</p>

      <div className="notice-box gold">
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.9 }}>
          <strong>원칙</strong> — 결제 후 풀이 결과가 발송되기 전까지는 100% 환불 가능하며, 발송 후에는 디지털 콘텐츠 특성상 환불이 제한됩니다. 단, 시스템 오류 등 회사 귀책 사유의 경우 전액 환불 또는 재발송이 가능합니다.
        </p>
      </div>

      <h2>제2조 (환불 가능 사유)</h2>
      <p>다음의 경우 전액 환불이 가능합니다.</p>

      <table>
        <thead>
          <tr><th>구분</th><th>사유</th><th>처리 방법</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>결제 직후</strong></td>
            <td>풀이 결과 발송 전 환불 요청</td>
            <td>100% 환불 (영업일 1~3일 내)</td>
          </tr>
          <tr>
            <td><strong>회사 귀책</strong></td>
            <td>시스템 오류로 풀이 결과 미수신</td>
            <td>100% 환불 또는 재발송 선택</td>
          </tr>
          <tr>
            <td><strong>콘텐츠 하자</strong></td>
            <td>약속한 내용과 현저히 다른 풀이 제공</td>
            <td>전액 환불 또는 재풀이 제공</td>
          </tr>
          <tr>
            <td><strong>중복 결제</strong></td>
            <td>동일 상품의 중복 결제</td>
            <td>중복분 즉시 환불</td>
          </tr>
        </tbody>
      </table>

      <h2>제3조 (환불 불가 사유)</h2>
      <p>다음의 경우 환불이 제한됩니다.</p>
      <ul>
        <li>풀이 결과가 정상적으로 발송 완료된 이후의 단순 변심</li>
        <li>이용자가 입력한 정보(생년월일, 시간 등)의 오류로 발생한 풀이 결과의 차이</li>
        <li>풀이 결과의 내용이 이용자의 기대와 다르다는 주관적 이유</li>
        <li>풀이 결과를 이용자의 부주의로 분실하거나 삭제한 경우 (단, 30일 이내 재발송 요청 가능)</li>
        <li>풀이 결과를 제3자에게 공유하거나 무단 배포한 경우</li>
      </ul>

      <h2>제4조 (환불 신청 방법)</h2>
      <ol>
        <li><strong>이메일로 신청</strong> — <a href={`mailto:${COMPANY.email}`} style={{ color: 'var(--gold-light)' }}>{COMPANY.email}</a>로 다음 정보와 함께 신청해 주세요.
          <ul>
            <li>주문번호 (결제 완료 시 발송된 알림톡에 기재)</li>
            <li>결제자 성명 및 연락처</li>
            <li>환불 요청 사유</li>
            <li>환불받을 계좌 정보 (계좌이체 결제의 경우)</li>
          </ul>
        </li>
        <li><strong>전화 문의</strong> — {COMPANY.phone} (평일 10:00 ~ 18:00)</li>
        <li>회사는 환불 신청 접수 후 영업일 기준 1~3일 이내에 검토 결과를 안내드립니다.</li>
      </ol>

      <h2>제5조 (환불 처리 기간 및 방법)</h2>
      <table>
        <thead>
          <tr><th>결제 수단</th><th>환불 방법</th><th>처리 기간</th></tr>
        </thead>
        <tbody>
          <tr><td>신용카드 / 체크카드</td><td>승인 취소</td><td>영업일 3~5일 (카드사 사정에 따라 변동)</td></tr>
          <tr><td>계좌이체</td><td>지정 계좌로 입금</td><td>영업일 1~3일</td></tr>
          <tr><td>간편결제 (카카오페이·네이버페이 등)</td><td>해당 결제수단으로 환불</td><td>영업일 1~3일</td></tr>
          <tr><td>휴대폰 결제</td><td>당월 결제분: 결제 취소 / 익월 결제분: 계좌 환불</td><td>영업일 3~5일</td></tr>
        </tbody>
      </table>

      <h2>제6조 (재발송 정책)</h2>
      <ol>
        <li>풀이 결과 발송 후 <strong>30일 이내</strong>에는 무료로 재발송이 가능합니다.</li>
        <li>30일 경과 후에는 데이터 보호 정책에 따라 풀이 결과를 파기하므로 재발송이 불가합니다.</li>
        <li>재발송 요청은 이메일 또는 전화로 가능하며, 본인 확인 후 처리됩니다.</li>
      </ol>

      <h2>제7조 (분쟁 해결)</h2>
      <p>환불과 관련하여 회사와 이용자 간 분쟁이 발생한 경우 다음 절차에 따라 해결합니다.</p>
      <ol>
        <li>고객센터(이메일·전화)를 통한 1차 협의</li>
        <li>협의 불성립 시 한국소비자원 또는 전자거래분쟁조정위원회에 조정 신청</li>
        <li>조정 불성립 시 회사 본사 소재지 관할 법원에 소 제기</li>
      </ol>

      <div className="notice-box">
        <p style={{ margin: '0 0 8px', fontSize: 15 }}><strong>관련 문의</strong></p>
        <p style={{ margin: '0', fontSize: 14, lineHeight: 1.9 }}>
          한국소비자원 — 1372 (www.kca.go.kr)<br/>
          전자거래분쟁조정위원회 — 1661-5714 (www.ecmc.or.kr)
        </p>
      </div>

      <h2>제8조 (정책 변경)</h2>
      <p>본 환불 정책은 관계 법령 또는 회사 정책의 변경 시 수정될 수 있으며, 변경 시 사전에 홈페이지에 공지합니다.</p>

      <div className="notice-box gold" style={{ marginTop: 48 }}>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.9, textAlign: 'center' }}>
          <strong>본 환불정책은 2026년 5월 19일부터 시행됩니다.</strong>
        </p>
      </div>
    </LegalLayout>
  );
}
