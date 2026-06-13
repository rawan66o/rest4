import Icon from "./Icon";

function StatCard({ item }) {
  return (
    <article className={`stats-card ${item.className}`}>
      <div className="stats-card__top">
        <p>{item.title}</p>
        <span className="stats-card__icon">
          {item.iconImage ? (
            <img src={item.iconImage} alt="" aria-hidden="true" />
          ) : (
            <Icon name={item.icon} size={28} />
          )}
        </span>
      </div>

      <div className="stats-card__bottom">
        <span className="stats-card__trend">
          +11.09%
          <Icon name="trend" size={16} />
        </span>
        <strong>{item.value}</strong>
      </div>
    </article>
  );
}

export default StatCard;
