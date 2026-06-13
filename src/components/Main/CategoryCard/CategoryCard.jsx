import "./CategoryCard.css";

function CategoryCard({ category }) {
  const title = category.name || category.title || "صنف";
  const image = category.image_url || category.image;
  const count = category.products_count || category.count || "0 صنف في المطعم";

  return (
    <article className={`category-card ${category.active ? "active" : ""}`}>
      {image && <img src={image} alt={title} />}
      <h3>{title}</h3>
      <p>{typeof count === "number" ? `${count} صنف في المطعم` : count}</p>
    </article>
  );
}

export default CategoryCard;
