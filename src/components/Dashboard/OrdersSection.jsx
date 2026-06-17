


import React from 'react';
import OrderRow from './OrderRow';
import Icon from '../Icon';

const OrdersSection = ({ orders, onDownloadInvoice }) => {
  return (
    <section className="dashboard-orders">
      <div className="dashboard-orders__header">
        <h2>الطلبات</h2>
        <button type="button" onClick={onDownloadInvoice}>
          <span>تنزيل الفاتورة</span>
          <Icon name="download" size={20} />
        </button>
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
};

export default OrdersSection;