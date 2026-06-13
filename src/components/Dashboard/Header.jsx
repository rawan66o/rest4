import Icon from "./Icon";
import AdminAvatar from "./AdminAvatar";
import { dashboardImages } from "../../data/dashboardData";

function Header({ admin, notificationCount }) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header__inner">
        <label className="dashboard-search">
          <input type="search" placeholder="بحث عن طلب / عميل / طبق" />
          <Icon name="search" size={20} />
        </label>

        <div className="dashboard-header__info">
          <div className="restaurant-status">
            <span className="restaurant-status__dot" />
            <div>
              <p>حالة المطعم</p>
              <span>المطعم مفتوح الآن ويستقبل الطلبات</span>
            </div>
          </div>

          <button type="button" className="notification-button" aria-label="الإشعارات">
            <img src={dashboardImages.notificationBell} alt="" aria-hidden="true" />
            <span>{notificationCount}</span>
          </button>

          <div className="admin-panel">
            <AdminAvatar />
            <div className="admin-panel__text">
              <p>{admin?.name || "اسم الأدمن"}</p>
              <span>{admin?.role || "admin"}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
