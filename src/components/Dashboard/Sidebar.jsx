import Icon from "./Icon";
import { dashboardImages, sidebarItems } from "../../data/dashboardData";
import { TOKEN_KEY } from "../../api";

function Sidebar() {
  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/";
  }

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar__logo">
        <img src={dashboardImages.logo} alt="مطعم أصلي" />
      </div>

      <nav className="dashboard-sidebar__nav" aria-label="لوحة التحكم">
        {sidebarItems.map((item) => (
          <button
            key={item.title}
            type="button"
            className={
              item.active
                ? "dashboard-sidebar__link active"
                : "dashboard-sidebar__link"
            }
          >
            <span className="dashboard-sidebar__link-content">
              {item.iconImage ? (
                <img
                  src={item.iconImage}
                  alt=""
                  aria-hidden="true"
                  className="dashboard-sidebar__icon"
                />
              ) : (
                <Icon name={item.icon} size={16} />
              )}

              <span>{item.title}</span>
            </span>
          </button>
        ))}
      </nav>

      <button
        type="button"
        className="dashboard-sidebar__logout"
        onClick={logout}
      >
        <span className="dashboard-sidebar__logout-content">
          <Icon name="logout" size={16} />
          <span>تسجيل خروج</span>
        </span>
      </button>
    </aside>
  );
}

export default Sidebar;