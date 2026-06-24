import { useEffect, useMemo, useState } from "react";
import "./Dashboard.css";

import Header from "../components/Dashboard/Header";
import Icon from "../components/Dashboard/Icon";
import OrdersAreaChart from "../components/Dashboard/OrdersAreaChart";
import OrdersSection from "../components/Dashboard/OrdersSection";
import StatCard from "../components/Dashboard/StatCard";
import TopDishesChart from "../components/Dashboard/TopDishesChart";

import { dashboardImages } from "../data/dashboardData";

/* ✅ FIX: حذف getAuthorizedToken واستبداله بـ getSavedToken */
import { API, getArray, getJson, getSavedToken } from "../api";

/* ================= Helpers ================= */

function normalizeStatus(status) {
  const value = String(status || "").toLowerCase();

  if (value === "preparing") return "preparing";
  if (value === "pending") return "pending";
  if (["completed", "done", "delivered"].includes(value)) return "completed";
  if (["cancelled", "canceled"].includes(value)) return "cancelled";

  return "new";
}

function getOrderTotal(order) {
  const value =
    order.total_amount ||
    order.totalAmount ||
    order.total ||
    order.grand_total ||
    order.amount ||
    0;

  const clean = String(value).replace(/,/g, "").replace(/[^\d.]/g, "");
  return Number(clean) || 0;
}

function formatOrderTime(value) {
  if (!value) return "الآن";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "الآن";

  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "الآن";
  if (minutes < 60) return `منذ ${minutes} دقائق`;
  if (hours < 24) return `منذ ${hours} ساعة`;
  if (days === 1) return "أمس";

  return `منذ ${days} أيام`;
}

function formatPrice(order) {
  const total = getOrderTotal(order);
  return `${total.toLocaleString("ar-SY")} ل.س`;
}

function normalizeOrder(order, index) {
  const items = order.items || [];
  const first = items[0] || {};
  const product = first.product || {};

  const createdAt =
    order.createdAt ||
    order.created_at ||
    order.date ||
    new Date().toISOString();

  const status = normalizeStatus(order.status || order.order_status);

  return {
    ...order,
    id: order.id || index,
    createdAt,
    status,
    time: formatOrderTime(createdAt),
    customerName: order.customerName || "عميل",
    dishName: product.name || order.dishName || "طلب",
    price: formatPrice(order),
  };
}

function filterOrdersByStatus(orders, status) {
  if (status === "all") return orders;
  return orders.filter((o) => o.status === status);
}

function calculateStats(orders, products, categories) {
  const totalRevenue = orders.reduce(
    (sum, o) => sum + getOrderTotal(o),
    0
  );

  return [
    {
      title: "الطلبات",
      value: orders.length,
      iconImage: dashboardImages.statsOrders,
      className: "stats-card--orange",
    },
    {
      title: "قيد التحضير",
      value: orders.filter((o) => o.status === "preparing").length,
      iconImage: dashboardImages.statsPreparing,
      className: "stats-card--yellow",
    },
    {
      title: "المنتجات",
      value: products.length,
      iconImage: dashboardImages.statsChart,
      className: "stats-card--blue",
    },
    {
      title: "الإيرادات",
      value: totalRevenue.toLocaleString("ar-SY"),
      iconImage: dashboardImages.statsRevenue,
      className: "stats-card--green",
    },
  ];
}

/* ================= Dashboard ================= */

function Dashboard() {
  const [admin, setAdmin] = useState({ name: "جاري التحميل..." });
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  useEffect(() => {
    document.body.classList.add("dashboard-page-body");
    return () =>
      document.body.classList.remove("dashboard-page-body");
  }, []);

  useEffect(() => {
    async function load() {
      try {
        /* ✅ FIX: بدون await */
        const token = getSavedToken();

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const [me, ordersRes, productsRes, categoriesRes] =
          await Promise.all([
            getJson(API.me, token).catch(() => null),
            getJson(API.adminOrders, token).catch(() => null),
            getJson(API.adminProducts, token).catch(() => null),
            getJson(API.adminCategories, token).catch(() => null),
          ]);

        const rawOrders = getArray(ordersRes);
        const rawProducts = getArray(productsRes);
        const rawCategories = getArray(categoriesRes);

        const normalized = rawOrders.map(normalizeOrder);

        setAdmin({
          name: me?.name || "Admin",
        });

        setOrders(normalized);
        setStats(
          calculateStats(normalized, rawProducts, rawCategories)
        );
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  const visibleOrders = useMemo(
    () => filterOrdersByStatus(orders, selectedStatus),
    [orders, selectedStatus]
  );

  return (
    <div className="dashboard-shell">
      <Header admin={admin} />

      <main className="dashboard-content">
        <h1>لوحة التحكم</h1>

        <section className="dashboard-stats">
          {stats.map((s) => (
            <StatCard key={s.title} item={s} />
          ))}
        </section>

        <section className="dashboard-charts">
          <OrdersAreaChart
            orders={orders}
            period={selectedPeriod}
            onChange={setSelectedPeriod}
          />

          <TopDishesChart orders={orders} />
        </section>

        <OrdersSection
          orders={visibleOrders}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
      </main>
    </div>
  );
}

export default Dashboard;