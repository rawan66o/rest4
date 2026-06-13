import { dashboardImages } from "../../data/dashboardData";

function AdminAvatar({ small = false }) {
  return (
    <div className={small ? "admin-avatar admin-avatar--small" : "admin-avatar"}>
      <img src={dashboardImages.adminAvatar} alt="صورة الأدمن" />
    </div>
  );
}

export default AdminAvatar;
