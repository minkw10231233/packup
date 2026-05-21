import { Link } from "react-router-dom";
import "./ServiceCard.css";

function ServiceCard({ title, text, img, alt, path }) {
  return (
    <Link to={path} className="service-card">
      <article>
        <img src={img} alt={alt} />
        <h3>{title}</h3>

        {text.map((t, index) => (
          <p key={`${title}-${index}`}>{t}</p>
        ))}
      </article>
    </Link>
  );
}

export default ServiceCard;