import { useState } from "react";
import Icon from "./Icon";
import OrderRow from "./OrderRow";

const filterOptions = [
  { value: "all", label: "كل الطلبات" },
  { value: "new", label: "طلبات جديدة" },
  { value: "pending", label: "قيد الانتظار" },
  { value: "preparing", label: "قيد التحضير" },
  { value: "completed", label: "مكتملة" },
  { value: "cancelled", label: "ملغاة" },
];

function OrdersSection({
  orders = [],
  selectedStatus = "all",
  onStatusChange,
  onDownloadInvoice,
}) {
  const [filterOpen, setFilterOpen] = useState(false);

  const selectedLabel =
    filterOptions.find((option) => option.value === selectedStatus)?.label ||
    "فلترة حسب";

  return (
    <section className="dashboard-orders">
      <div className="dashboard-orders__tools">
        <h2>الطلبات</h2>

        <div className="dashboard-orders__buttons">
          <div className="orders-filter">
            <button
              type="button"
              onClick={() => setFilterOpen((prev) => !prev)}
            >
              <span>{selectedLabel}</span>
              <Icon name="filter" size={20} />
            </button>

            {filterOpen && (
              <div className="orders-filter__menu">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={
                      selectedStatus === option.value ? "active" : ""
                    }
                    onClick={() => {
                      onStatusChange(option.value);
                      setFilterOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button type="button" onClick={onDownloadInvoice}>
            <span>تنزيل الفاتورة</span>
            <Icon name="download" size={20} />
          </button>
        </div>
      </div>

      <div className="dashboard-orders__list">
        {orders.length > 0 ? (
          orders.map((order) => <OrderRow key={order.id} order={order} />)
        ) : (
          <p className="dashboard-orders__empty">
            لا توجد طلبات مطابقة للفلترة الحالية.
          </p>
        )}
      </div>
    </section>
  );
}

export default OrdersSection;