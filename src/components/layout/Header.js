import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);
  const openBtnRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
      closeBtnRef.current?.focus({ preventScroll: true });
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        openBtnRef.current?.focus();
      }
    }

    function handleClickOutside(e) {
      if (!isOpen) return;

      const menuEl = menuRef.current;
      if (!menuEl) return;

      if (!menuEl.contains(e.target)) {
        setIsOpen(false);
        openBtnRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleCloseMenu = () => {
    setIsOpen(false);
    openBtnRef.current?.focus();
  };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="주요 메뉴">
        <Link to="/" className="logo" aria-label="PackUp 홈으로">
          <img src="/img/delivery.png" alt="PackUp 로고" />
          <span>PackUp</span>
        </Link>

        {!isOpen && (
          <button
            ref={openBtnRef}
            className="menu-toggle"
            type="button"
            aria-label="메뉴 열기"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            ☰
          </button>
        )}

        {isOpen && (
          <button
            ref={closeBtnRef}
            className="close-toggle"
            type="button"
            aria-label="메뉴 닫기"
            onClick={(e) => {
              e.stopPropagation();
              handleCloseMenu();
            }}
          >
            ✕
          </button>
        )}

        <div
          ref={menuRef}
          className={`navbar2 ${isOpen ? "active" : ""}`}
          hidden={!isOpen}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="t-row">
            <li>
              <Link to="/service/only-drive" className="menu-pill" onClick={handleCloseMenu}>
                <span className="menu-text">운전만</span>
                <span className="menu-arrow">›</span>
              </Link>
            </li>
            <li>
              <Link to="/service/one-help" className="menu-pill" onClick={handleCloseMenu}>
                <span className="menu-text">1인 도움</span>
                <span className="menu-arrow">›</span>
              </Link>
            </li>
            <li>
              <Link to="/service/two-help" className="menu-pill" onClick={handleCloseMenu}>
                <span className="menu-text">2인 도움</span>
                <span className="menu-arrow">›</span>
              </Link>
            </li>

            <li>
              <Link to="/estimate" className="menu-pill" onClick={handleCloseMenu}>
                <span className="menu-text">견적 계산</span>
                <span className="menu-arrow">›</span>
              </Link>
            </li>
            <li>
              <Link to="/consult" className="menu-cta" onClick={handleCloseMenu}>
                상담 신청하기
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
