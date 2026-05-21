import { Link } from "react-router-dom";
import { services } from "../data/services";
import { faqs } from "../data/faq";
import ServiceList from "../components/home/ServiceList";


function Home() {
  return (
    <div className="home-page">
    <main id="main">
            <section className="content" aria-labelledby="page-title">
            <div className="header-area">
                <div className="left-h">
                <div className="middle-content">
                    <p className="isa">
                    <span className="line">원룸 · 투룸 · 일반 이사</span>
                    <span className="line">반포장 이사</span>
                    </p>

                    <h1 id="page-title" className="isa-text">
                        이사, 더 쉽고 편하게.
                    </h1>

                    <div className="main-btn" aria-label="주요 행동">
                        <Link to="/estimate" className="hero-button hero-button-outline">
                            견적 계산하기
                        </Link>
                        <Link to="/consult" className="hero-button hero-button-primary">
                            상담 신청하기
                        </Link>
                    </div>
                </div>

                <div className="low-btn" aria-label="빠른 이동">
                    <a href="#services" className="lowbtn">
                    서비스 종류 선택
                    </a>
                    <a href="#faq" className="lowbtn">
                    자주 받는 질문
                    </a>
                </div>
                </div>

                <div className="main-banner">
                <img src="/img/packmain.png" alt="Packup 이사 서비스 메인 배너" />
                </div>
            </div>
            </section>

            <section className="content" aria-labelledby="why-title">
            <div className="why-text">
                <h2 id="why-title" className="visually-hidden">
                왜 팩업을 선택해야 할까?
                </h2>

                <div className="text-line" aria-hidden="true">
                <span className="big-c">왜</span>
                <span className="small-c">
                    팩업
                    <br />
                    선택해야
                    <br />
                    할까?
                </span>
                </div>

                <div className="l-container">
                <div className="l-text">
                    <h3 className="l-big">10분 이내 상담 후 예약 완료</h3>
                    <p className="l-small">
                    전문 1:1 배차 상담원이 실시간으로 상담해 드립니다.
                    <br />
                    이동거리·짐의 양·작업조건에 따라 견적을 안내해요.
                    </p>
                </div>

                <div className="r-text" aria-label="대표 요금 예시">
                    <div className="top-img">
                    <figure className="c-img">
                        <img className="car" src="/img/drive.png" alt="운전만 서비스 아이콘" />
                        <figcaption className="drive">
                        운전만 <strong>5만원</strong>부터~
                        </figcaption>
                    </figure>

                    <figure className="he-img">
                        <img className="help" src="/img/help.png" alt="도움이사 서비스 아이콘" />
                        <figcaption className="help-text">
                        도움이사 <strong>8만원</strong>부터
                        </figcaption>
                    </figure>
                    </div>

                    <figure className="ha-img">
                    <img className="half" src="/img/half.png" alt="반포장이사 서비스 아이콘" />
                    <figcaption className="half-text">
                        반포장이사 <strong>12만원</strong>부터
                    </figcaption>
                    </figure>
                </div>
                </div>
            </div>
            </section>

            <section className="content" aria-labelledby="hour-title">
            <div className="hour">
                <img
                className="hour-img"
                src="/img/hour.png"
                alt="빠른 이사 진행을 나타내는 그래픽"
                />
                <div className="hour-text">
                <h2 id="hour-title" className="hour-b">
                    몇 시간 만에 한 집에서 <br />
                    다른 집으로 이사
                </h2>
                <p className="hour-s">
                    집 이사를 준비하시려면 화물 배송을 주문하시면 됩니다.
                    <br />
                    차량이 도착하면, 필요 시 이삿짐센터 직원들이 무거운 짐도 안전하게 도와드립니다.
                </p>
                </div>
            </div>
            </section>

            <section className="content" aria-labelledby="req-title">
            <div className="req">
                <h2 id="req-title" className="req-b">
                귀하의 요구 사항에 맞는 차량
                </h2>
                <p className="req-s">
                집 이사는 경우에 따라 다릅니다.
                <br />
                모든 장비와 가구를 가져가는 경우도 있고, 몇 상자만 가져가는 경우도 있습니다.
                <br />
                그리고 모든 상황에 맞는 차량이 있습니다.
                </p>
            </div>
            </section>

            <section className="content" id="services" aria-labelledby="services-title">
            <h2 id="services-title" className="visually-hidden">
                서비스 종류
            </h2>

            <ServiceList services={services} />
            </section>

            <section className="content" aria-labelledby="thx-title">
            <div className="thx">
                <h2 id="thx-title" className="thx-b">
                팩업 이용해 주셔서 감사합니다
                </h2>
                <p className="thx-s">고객 여러분의 만족을 위해 최선을 다하겠습니다.</p>
            </div>
            </section>

            <section className="content" aria-labelledby="reviews-title">
            <h2 id="reviews-title" className="visually-hidden">
                고객 후기 이미지
            </h2>
            <div className="msg">
                <img className="msg-img" src="/img/msg1.jpg" alt="고객 후기 이미지 1" loading="lazy" />
                <img className="msg-img" src="/img/msg2.jpg" alt="고객 후기 이미지 2" loading="lazy" />
                <img className="msg-img" src="/img/msg3.jpg" alt="고객 후기 이미지 3" loading="lazy" />
                <img className="msg-img" src="/img/msg4.jpg" alt="고객 후기 이미지 4" loading="lazy" />
                <img className="msg-img" src="/img/msg5.jpg" alt="고객 후기 이미지 5" loading="lazy" />
            </div>
            </section>

            <section className="content" id="faq" aria-labelledby="faq-title">
  <div className="quest-t">
    <h2 id="faq-title" className="somet">
      우리는 종종 다음과 같은 질문을 받습니다.
    </h2>

    <div className="quest-img">
      {faqs.map(({ question, answer }) => (
  <details className="ans" key={question}>
    <summary className="dimg-text">
      <span className="img-q">{question}</span>
      <span className="chev" aria-hidden="true"></span>
    </summary>
    <p className="qa-text">{answer}</p>
  </details>
))}
    </div>
  </div>
</section>
        </main>
        </div>

       );
}

export default Home;