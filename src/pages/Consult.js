import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Consult.css";

const CONSULT_STORAGE_KEY = "packup_consults";

function createConsultId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `consult-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getSavedConsults() {
  try {
    const savedConsults = JSON.parse(localStorage.getItem(CONSULT_STORAGE_KEY));
    return Array.isArray(savedConsults) ? savedConsults : [];
  } catch {
    return [];
  }
}

function saveConsult(consult) {
  const savedConsults = getSavedConsults();
  localStorage.setItem(
    CONSULT_STORAGE_KEY,
    JSON.stringify([consult, ...savedConsults])
  );
}

function Consult() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    date: "",
    time: "",
    message: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    message: "",
    agree: "",
  });

  function isValidPhone(value) {
    const v = value.trim();
    return /^01[016789]-?\d{3,4}-?\d{4}$/.test(v);
  }

  function isValidEmail(value) {
    const v = value.trim();
    if (!v) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function clearErrors() {
    setErrors({
      name: "",
      phone: "",
      email: "",
      category: "",
      message: "",
      agree: "",
    });
  }

  function validate() {
    const newErrors = {
      name: "",
      phone: "",
      email: "",
      category: "",
      message: "",
      agree: "",
    };

    let ok = true;

    if (!form.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
      ok = false;
    }

    if (!form.phone.trim()) {
      newErrors.phone = "연락처를 입력해주세요.";
      ok = false;
    } else if (!isValidPhone(form.phone)) {
      newErrors.phone = "연락처 형식이 올바르지 않아요.";
      ok = false;
    }

    if (!isValidEmail(form.email)) {
      newErrors.email = "이메일 형식이 올바르지 않아요.";
      ok = false;
    }

    if (!form.category) {
      newErrors.category = "상담 유형을 선택해주세요.";
      ok = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "상담 내용을 입력해주세요.";
      ok = false;
    }

    if (!form.agree) {
      newErrors.agree = "동의 체크가 필요해요.";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    clearErrors();
    const ok = validate();
    if (!ok) return;

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      category: form.category,
      date: form.date,
      time: form.time,
      message: form.message.trim(),
      createdAt: new Date().toISOString(),
    };

    const newConsult = {
      id: createConsultId(),
      ...payload,
      status: "pending",
    };

    try {
      setLoading(true);
      saveConsult(newConsult);
      navigate("/complete");
    } catch {
      alert("상담 신청 저장 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="consult-page">
      <main className="main">
        <div className="wrap">
          <div className="grid">
            <section className="card" aria-labelledby="pageTitle">
              <h1 id="pageTitle" className="title">
                상담 신청하기
              </h1>

              <p className="sub">
                아래 내용을 남겨주시면 확인 후 연락드릴게요.
              </p>

              <form className="form" onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="field">
                    <label htmlFor="name" className="label-left">
                      이름
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="예: 민경원"
                      value={form.name}
                      onChange={handleChange}
                      className={errors.name ? "input-error" : ""}
                    />
                    <p className="error">{errors.name}</p>
                  </div>

                  <div className="field">
                    <label htmlFor="phone" className="label-left">
                      연락처
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="예: 010-1234-5678"
                      value={form.phone}
                      onChange={handleChange}
                      className={errors.phone ? "input-error" : ""}
                    />
                    <p className="error">{errors.phone}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="field">
                    <label htmlFor="email" className="label-left">
                      이메일
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="예: you@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className={errors.email ? "input-error" : ""}
                    />
                    <p className="error">{errors.email}</p>
                  </div>

                  <div className="field">
                    <label htmlFor="category" className="label-left">
                      상담 유형
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className={errors.category ? "input-error" : ""}
                    >
                      <option value="">선택해주세요</option>
                      <option value="only-drive">운전만 상담</option>
                      <option value="one-help">1인 도움 상담</option>
                      <option value="two-help">2인 도움 상담</option>
                      <option value="other">기타</option>
                    </select>
                    <p className="error">{errors.category}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="field">
                    <label htmlFor="date" className="label-left">
                      희망 날짜
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="time" className="label-left">
                      희망 시간
                    </label>
                    <input
                      id="time"
                      name="time"
                      type="time"
                      value={form.time}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="message" className="label-left">
                    상담 내용
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="상담 받고 싶은 내용/상황/목표를 적어주세요."
                    value={form.message}
                    onChange={handleChange}
                    className={errors.message ? "input-error" : ""}
                  ></textarea>
                  <p className="error">{errors.message}</p>
                </div>

                <div className="checkline">
                  <input
                    id="agree"
                    name="agree"
                    type="checkbox"
                    checked={form.agree}
                    onChange={handleChange}
                  />
                  <label htmlFor="agree" className="agreeText">
                    (필수) 개인정보 수집 및 이용에 동의합니다.
                  </label>
                </div>
                <p className="error">{errors.agree}</p>

                <div className="actions">
                  <button className="submit" type="submit" disabled={loading}>
                    {loading ? "저장 중..." : "상담 신청 제출"}
                  </button>

                  <Link className="cons-home" to="/">
                    홈으로
                  </Link>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Consult;
