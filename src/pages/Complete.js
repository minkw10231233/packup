import '../styles/Complete.css';
import { Link } from "react-router-dom";

function Complete() {
  return (
    <main className="comp">
      <section className="comp-card" aria-labelledby="compTitle">
        <p className="comp-badge" aria-hidden="true">✓</p>

        <h1 id="compTitle" className="comp-title">
          상담 신청이 완료되었습니다
        </h1>

        <p className="comp-desc">
          남겨주신 정보로 확인 후 <b>영업일 기준 1~2일 내</b>에 연락드릴게요.
          <br />
        </p>

        <div className="comp-actions">
          <Link className="comp-home" to="/">
            홈으로 가기
          </Link>

          <Link className="rewrite" to="/consult">
            다시 작성하기
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Complete;