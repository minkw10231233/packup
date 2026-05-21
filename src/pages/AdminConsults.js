import { useEffect, useMemo, useState } from "react";
import "../styles/AdminConsults.css";

const CONSULT_STORAGE_KEY = "packup_consults";

const categoryLabels = {
  "only-drive": "운전만 상담",
  "one-help": "1인 도움 상담",
  "two-help": "2인 도움 상담",
  other: "기타",
};

function getSavedConsults() {
  try {
    const savedConsults = JSON.parse(localStorage.getItem(CONSULT_STORAGE_KEY));
    return Array.isArray(savedConsults) ? savedConsults : [];
  } catch {
    return [];
  }
}

function saveConsults(consults) {
  localStorage.setItem(CONSULT_STORAGE_KEY, JSON.stringify(consults));
}

function formatDateTime(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AdminConsults() {
  const [consults, setConsults] = useState(() => getSavedConsults());
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedConsult, setSelectedConsult] = useState(null);

  const summary = useMemo(() => {
    return {
      total: consults.length,
      pending: consults.filter((consult) => consult.status === "pending").length,
      progress: consults.filter((consult) => consult.status === "progress").length,
      done: consults.filter((consult) => consult.status === "done").length,
    };
  }, [consults]);

  const filteredConsults = useMemo(() => {
    const trimmedKeyword = keyword.trim().toLowerCase();

    return consults.filter((consult) => {
      const targetText = [
        consult.name,
        consult.phone,
        consult.email,
        categoryLabels[consult.category] || consult.category,
        consult.message,
      ]
        .join(" ")
        .toLowerCase();

      const matchesKeyword = !trimmedKeyword || targetText.includes(trimmedKeyword);
      const matchesStatus = statusFilter === "all" || consult.status === statusFilter;

      return matchesKeyword && matchesStatus;
    });
  }, [consults, keyword, statusFilter]);

  function updateConsults(nextConsults) {
    setConsults(nextConsults);
    saveConsults(nextConsults);
  }

  function updateStatus(id, nextStatus) {
    const nextConsults = consults.map((consult) =>
      consult.id === id ? { ...consult, status: nextStatus } : consult
    );

    updateConsults(nextConsults);

    setSelectedConsult((prev) =>
      prev && prev.id === id ? { ...prev, status: nextStatus } : prev
    );
  }

  function deleteConsult(id) {
    const ok = window.confirm("이 상담 신청 내역을 삭제할까요?");
    if (!ok) return;

    const nextConsults = consults.filter((consult) => consult.id !== id);
    updateConsults(nextConsults);

    setSelectedConsult((prev) => (prev && prev.id === id ? null : prev));
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setSelectedConsult(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="admin-page">
      <section className="admin-hero" aria-labelledby="admin-title">
        <p className="admin-kicker">PackUp 관리자 데모</p>
        <h1 id="admin-title">상담 신청 관리</h1>
        <p>
          상담 신청 폼에서 저장된 데이터를 확인하고, 상태를 변경하거나 상세 내용을 볼 수 있습니다.
          데이터는 포트폴리오 데모용으로 브라우저 localStorage에 저장됩니다.
        </p>
      </section>

      <section className="admin-summary" aria-label="상담 신청 요약">
        <div className="admin-summary-card">
          <strong>{summary.total}</strong>
          <span>전체</span>
        </div>
        <div className="admin-summary-card">
          <strong>{summary.pending}</strong>
          <span>대기</span>
        </div>
        <div className="admin-summary-card">
          <strong>{summary.progress}</strong>
          <span>진행중</span>
        </div>
        <div className="admin-summary-card">
          <strong>{summary.done}</strong>
          <span>완료</span>
        </div>
      </section>

      <section className="admin-controls" aria-label="상담 신청 검색 및 필터">
        <label className="admin-search-label" htmlFor="adminKeyword">
          검색어
        </label>
        <input
          id="adminKeyword"
          type="search"
          placeholder="이름, 연락처, 상담 내용 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <label className="admin-status-label" htmlFor="adminStatusFilter">
          상태
        </label>
        <select
          id="adminStatusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">전체 상태</option>
          <option value="pending">대기</option>
          <option value="progress">진행중</option>
          <option value="done">완료</option>
        </select>
      </section>

      <section className="admin-list" aria-label="상담 신청 목록">
        {filteredConsults.length === 0 ? (
          <div className="admin-empty">
            <strong>상담 신청 내역이 없습니다.</strong>
            <p>/consult에서 상담 신청을 제출하면 이곳에 표시됩니다.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>이름</th>
                  <th>연락처</th>
                  <th>상담 유형</th>
                  <th>희망 날짜</th>
                  <th>상태</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {filteredConsults.map((consult) => (
                  <tr key={consult.id}>
                    <td>{consult.name}</td>
                    <td>{consult.phone}</td>
                    <td>{categoryLabels[consult.category] || consult.category}</td>
                    <td>{consult.date || "미정"}</td>
                    <td>
                      <select
                        className="admin-status-select"
                        value={consult.status}
                        onChange={(e) => updateStatus(consult.id, e.target.value)}
                      >
                        <option value="pending">대기</option>
                        <option value="progress">진행중</option>
                        <option value="done">완료</option>
                      </select>
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-detail-button"
                          onClick={() => setSelectedConsult(consult)}
                        >
                          상세
                        </button>
                        <button
                          type="button"
                          className="admin-delete-button"
                          onClick={() => deleteConsult(consult.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedConsult && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedConsult(null)}>
          <section
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="admin-modal-close"
              onClick={() => setSelectedConsult(null)}
              aria-label="상담 상세 닫기"
            >
              ×
            </button>

            <p className="admin-modal-kicker">상담 상세</p>
            <h2 id="admin-modal-title">{selectedConsult.name}님의 신청</h2>

            <dl className="admin-detail-list">
              <div>
                <dt>연락처</dt>
                <dd>{selectedConsult.phone}</dd>
              </div>
              <div>
                <dt>이메일</dt>
                <dd>{selectedConsult.email || "없음"}</dd>
              </div>
              <div>
                <dt>상담 유형</dt>
                <dd>{categoryLabels[selectedConsult.category] || selectedConsult.category}</dd>
              </div>
              <div>
                <dt>희망 날짜</dt>
                <dd>{selectedConsult.date || "미정"}</dd>
              </div>
              <div>
                <dt>희망 시간</dt>
                <dd>{selectedConsult.time || "미정"}</dd>
              </div>
              <div>
                <dt>신청 일시</dt>
                <dd>{formatDateTime(selectedConsult.createdAt)}</dd>
              </div>
              <div>
                <dt>상태</dt>
                <dd>
                  <select
                    className="admin-status-select"
                    value={selectedConsult.status}
                    onChange={(e) => updateStatus(selectedConsult.id, e.target.value)}
                  >
                    <option value="pending">대기</option>
                    <option value="progress">진행중</option>
                    <option value="done">완료</option>
                  </select>
                </dd>
              </div>
            </dl>

            <div className="admin-message-box">
              <strong>상담 내용</strong>
              <p>{selectedConsult.message}</p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default AdminConsults;
