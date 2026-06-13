import "./MealCard.css";
import { formatPrice } from "../../../api";

function MealCard({ meal }) {
  const title = meal.name || meal.title || "اسم المنتج";
  const description = meal.description || "";
  const image = meal.image_url || meal.image;
  const category = meal.category?.name || meal.badge || meal.category || "";
  const price = meal.price
    ? formatPrice(meal.price).replace("ل.س", "").trim()
    : "0";
  const currency = meal.currency || "ل.س";
  const totalOrdered = meal.total_ordered || meal.totalOrdered;

  return (
    <article className="meal-card">
      {totalOrdered ? (
        <span className="meal-card__discount">{totalOrdered}</span>
      ) : meal.discount ? (
        <span className="meal-card__discount">{meal.discount}</span>
      ) : null}

      <div className="meal-card__image">
        {image && <img src={image} alt={title} />}
        {category && <span className="meal-card__badge">{category}</span>}
      </div>

      <div className="meal-card__body">
        <div className="meal-card__content">
          <h3>{title}</h3>
          {description && <p>{description}</p>}

          <div className="meal-card__prices">
            {meal.oldPrice && (
              <span className="meal-card__old-price">
                {meal.oldPrice} {meal.currency}
              </span>
            )}

            <strong className="meal-card__price">
              <span>{price}</span>
              <span>{currency}</span>
            </strong>
          </div>
        </div>

        <button type="button" className="meal-card__button">
          أضف للسلة +
        </button>
      </div>
    </article>
  );
}

export default MealCard;
