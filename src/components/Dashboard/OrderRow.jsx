import AdminAvatar from "./AdminAvatar";
import Icon from "./Icon";
import { dashboardImages } from "../../data/dashboardData"; 

function OrderRow({ order }) {
  const images = order.images || [];
  const extraCount = order.extraItemsCount || 0;

  const img1 = images[0] || dashboardImages.meal;
  const img2 = images[1] || dashboardImages.burger;

  return (
    <article className="order-row">
      <div className="order-row__content">
        <div className="order-row__meta">
          <strong>{order.id}</strong>
          <span>{order.time}</span>
        </div>

        <div className="order-row__customer">
          <AdminAvatar small />
          <div>
            <p>{order.customerName}</p>
            <span>{order.customerType}</span>
          </div>
        </div>

        <strong className="order-row__price">{order.price}</strong>

        <div className="order-row__images">
          {extraCount > 0 ? (
            <span className="order-row__images-count">+{extraCount}</span>
          ) : null}

          <div className="order-row__images-item order-row__images-item--1">
            <img src={img1} alt="طبق مطلوب" />
          </div>

          <div className="order-row__images-item order-row__images-item--2">
            <img src={img2} alt="طبق مطلوب" />
          </div>
        </div>

        <div className="order-row__dish">
          <p>{order.dishName}</p>
          <span>
            {order.dishDetails}
            {extraCount > 0 && <small>+{extraCount}</small>}
          </span>
        </div>

        <div className="order-row__category">
          <p>{order.categoryName}</p>
          <span>{order.categoryDetails}</span>
        </div>

        <div className="order-row__actions">
          <button type="button" aria-label="حذف الطلب">
            <Icon name="trash" size={16} />
          </button>
          <button type="button" aria-label="عرض الطلب">
            <Icon name="eye" size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default OrderRow;