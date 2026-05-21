import { useEffect, useState } from "react";
import "../../styles/Footer.css";

const footerNotices = {
  privacy: {
    title: "개인정보처리방침",
    content:
      "상담 신청을 위해 이름, 연락처, 이메일, 상담 내용을 입력받습니다. 입력된 정보는 상담 응대 목적 외에는 사용하지 않습니다.",
  },
  email: {
    title: "이메일 수집 거부",
    content:
      "본 사이트에 게시된 이메일 주소의 무단 수집을 거부합니다. 자동 수집 프로그램 등을 통한 수집은 허용되지 않습니다.",
  },
  refund: {
    title: "취소 및 환불규정",
    content:
      "서비스 예약 및 취소 관련 내용은 상담 확정 과정에서 안내됩니다. 실제 작업 진행 전에는 상담을 통해 일정 변경이나 취소를 조율할 수 있습니다.",
  },
};

function Footer() {
  const [selectedNotice, setSelectedNotice] = useState(null);

  const notice = selectedNotice ? footerNotices[selectedNotice] : null;

  function closeModal() {
    setSelectedNotice(null);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closeModal();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <footer className="site-footer">
        <div className="footer-content">
          <ul className="footer-list">
            <li>
              <button
                type="button"
                className="footer-link"
                onClick={() => setSelectedNotice("privacy")}
              >
                개인정보처리방침
              </button>
            </li>

            <li>
              <button
                type="button"
                className="footer-link"
                onClick={() => setSelectedNotice("email")}
              >
                이메일 수집 거부
              </button>
            </li>

            <li>
              <button
                type="button"
                className="footer-link"
                onClick={() => setSelectedNotice("refund")}
              >
                취소 및 환불규정
              </button>
            </li>
          </ul>
        </div>
      </footer>

      {notice && (
        <div className="footer-modal-backdrop" onClick={closeModal}>
          <section
            className="footer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="footer-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="footer-modal-close"
              onClick={closeModal}
              aria-label="안내 창 닫기"
            >
              ×
            </button>

            <h2 id="footer-modal-title">{notice.title}</h2>
            <p>{notice.content}</p>
          </section>
        </div>
      )}
    </>
  );
}

export default Footer;