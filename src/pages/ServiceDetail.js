import { Link, useParams } from "react-router-dom";
import { serviceDetails } from "../data/serviceDetails";
import "../styles/ServiceDetail.css";

function renderImageGroup(group) {
  if (group.type === "double") {
    return (
      <div className="two-img" key={group.images.map((image) => image.src).join("-")}> 
        {group.images.map((image) => (
          <img
            key={image.src}
            className={image.className}
            src={image.src}
            alt={image.alt}
            loading="lazy"
          />
        ))}
      </div>
    );
  }

  return (
    <img
      key={group.image.src}
      className={group.image.className}
      src={group.image.src}
      alt={group.image.alt}
      loading="lazy"
    />
  );
}

function ServiceDetail() {
  const { id } = useParams();
  const service = serviceDetails.find((item) => item.id === id);

  if (!service) {
    return (
      <main id="main" className="service-detail-content">
        <section className="od">
          <div className="od-text">
            <h1 className="onlyDrive-title">서비스를 찾을 수 없습니다.</h1>
            <p className="onlyDrive-text">
              주소가 잘못되었거나 더 이상 제공하지 않는 서비스입니다.
            </p>
            <div className="detail-actions">
              <Link className="detail-consult-link" to="/">
                홈으로 이동
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="main" className="service-detail-content">
      <section className="od">
        <div className="od-text">
          <h1 className="onlyDrive-title">{service.title}</h1>

          {service.content.map((block, index) => {
            if (block.type === "list") {
              return (
                <ul className="onlyDrive-bullets" key={`list-${index}`}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }

            return (
              <p className="onlyDrive-text" key={`paragraph-${index}`}>
                {block.text}
              </p>
            );
          })}

          <div className="detail-actions">
            <Link className="detail-consult-link" to="/consult">
              상담 신청하기
            </Link>
          </div>
        </div>

        <div className="od-img" aria-label={service.imageAriaLabel}>
          {service.imageGroups.map(renderImageGroup)}
        </div>
      </section>
    </main>
  );
}

export default ServiceDetail;
