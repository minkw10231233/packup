import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Estimate.css";

const moveTypes = {
  "only-drive": {
    label: "운전만",
    basePrice: 50000,
    description: "차량과 기사님 운전 중심의 기본 이사",
  },
  "one-help": {
    label: "1인 도움이사",
    basePrice: 80000,
    description: "기사님 1명이 함께 짐 운반을 도와주는 이사",
  },
  "two-help": {
    label: "2인 도움이사",
    basePrice: 120000,
    description: "기사님 포함 2명이 함께 짐 운반을 도와주는 이사",
  },
};

const baggageOptions = {
  small: {
    label: "적음",
    extraPrice: 0,
    description: "박스 5개 이하 또는 소형 가구 위주",
  },
  medium: {
    label: "보통",
    extraPrice: 30000,
    description: "원룸 기본 짐 수준",
  },
  large: {
    label: "많음",
    extraPrice: 60000,
    description: "큰 가구 또는 박스가 많은 경우",
  },
};

function formatPrice(price) {
  return price.toLocaleString("ko-KR");
}

function Estimate() {
  const [form, setForm] = useState({
    moveType: "only-drive",
    distance: "5",
    floor: "1",
    hasElevator: "yes",
    baggage: "small",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const estimate = useMemo(() => {
    const moveType = moveTypes[form.moveType];
    const baggage = baggageOptions[form.baggage];

    const distance = Math.max(Number(form.distance) || 0, 0);
    const floor = Math.max(Number(form.floor) || 0, 0);

    const basePrice = moveType.basePrice;
    const distancePrice = distance * 2000;
    const floorPrice = floor > 1 ? (floor - 1) * 5000 : 0;
    const elevatorPrice = form.hasElevator === "no" ? 20000 : 0;
    const baggagePrice = baggage.extraPrice;

    const total = basePrice + distancePrice + floorPrice + elevatorPrice + baggagePrice;

    return {
      basePrice,
      distancePrice,
      floorPrice,
      elevatorPrice,
      baggagePrice,
      total,
      moveTypeLabel: moveType.label,
      baggageLabel: baggage.label,
    };
  }, [form]);

  return (
    <main className="estimate-page">
      <section className="estimate-hero" aria-labelledby="estimate-title">
        <p className="estimate-kicker">PackUp 예상 견적</p>
        <h1 id="estimate-title">이사 조건을 입력하면 예상 금액을 계산해드려요.</h1>
        <p>
          실제 견적은 짐의 양, 이동 환경, 주차 상황에 따라 달라질 수 있습니다.
          이 계산기는 상담 전 대략적인 금액을 확인하기 위한 기능입니다.
        </p>
      </section>

      <section className="estimate-layout">
        <form className="estimate-form" onSubmit={(e) => e.preventDefault()}>
          <div className="estimate-field">
            <label htmlFor="moveType">이사 유형</label>
            <select id="moveType" name="moveType" value={form.moveType} onChange={handleChange}>
              {Object.entries(moveTypes).map(([value, item]) => (
                <option key={value} value={value}>
                  {item.label} - 기본 {formatPrice(item.basePrice)}원
                </option>
              ))}
            </select>
            <p>{moveTypes[form.moveType].description}</p>
          </div>

          <div className="estimate-row">
            <div className="estimate-field">
              <label htmlFor="distance">이동 거리</label>
              <div className="estimate-input-unit">
                <input
                  id="distance"
                  name="distance"
                  type="number"
                  min="0"
                  value={form.distance}
                  onChange={handleChange}
                />
                <span>km</span>
              </div>
            </div>

            <div className="estimate-field">
              <label htmlFor="floor">출발지 층수</label>
              <div className="estimate-input-unit">
                <input
                  id="floor"
                  name="floor"
                  type="number"
                  min="1"
                  value={form.floor}
                  onChange={handleChange}
                />
                <span>층</span>
              </div>
            </div>
          </div>

          <div className="estimate-field">
            <label htmlFor="hasElevator">엘리베이터 여부</label>
            <select id="hasElevator" name="hasElevator" value={form.hasElevator} onChange={handleChange}>
              <option value="yes">있음</option>
              <option value="no">없음 / 사용 불가</option>
            </select>
          </div>

          <div className="estimate-field">
            <label htmlFor="baggage">짐 양</label>
            <select id="baggage" name="baggage" value={form.baggage} onChange={handleChange}>
              {Object.entries(baggageOptions).map(([value, item]) => (
                <option key={value} value={value}>
                  {item.label} {item.extraPrice > 0 ? `+${formatPrice(item.extraPrice)}원` : "+0원"}
                </option>
              ))}
            </select>
            <p>{baggageOptions[form.baggage].description}</p>
          </div>
        </form>

        <aside className="estimate-result" aria-label="예상 견적 결과">
          <p className="result-label">예상 견적</p>
          <strong>{formatPrice(estimate.total)}원</strong>
          <span>선택 유형: {estimate.moveTypeLabel} / 짐 양: {estimate.baggageLabel}</span>

          <dl className="estimate-breakdown">
            <div>
              <dt>기본 요금</dt>
              <dd>{formatPrice(estimate.basePrice)}원</dd>
            </div>
            <div>
              <dt>거리 추가 요금</dt>
              <dd>{formatPrice(estimate.distancePrice)}원</dd>
            </div>
            <div>
              <dt>층수 추가 요금</dt>
              <dd>{formatPrice(estimate.floorPrice)}원</dd>
            </div>
            <div>
              <dt>엘리베이터 추가 요금</dt>
              <dd>{formatPrice(estimate.elevatorPrice)}원</dd>
            </div>
            <div>
              <dt>짐 양 추가 요금</dt>
              <dd>{formatPrice(estimate.baggagePrice)}원</dd>
            </div>
          </dl>

          <Link className="estimate-consult" to="/consult">
            상담 신청하기
          </Link>
        </aside>
      </section>
    </main>
  );
}

export default Estimate;
