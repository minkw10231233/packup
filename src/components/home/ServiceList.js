import ServiceCard from "./ServiceCard";

function ServiceList({ services }) {
  return (
    <div className="drive-list">
      {services.map((item) => (
        <ServiceCard key={item.title} {...item} />
      ))}
    </div>
  );
}

export default ServiceList;