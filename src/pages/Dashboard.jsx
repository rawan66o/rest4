import { useEffect, useMemo, useState } from "react";
import "./Dashboard.css";

import Header from "../components/Dashboard/Header";
import Icon from "../components/Dashboard/Icon";
import OrdersAreaChart from "../components/Dashboard/OrdersAreaChart";
import OrdersSection from "../components/Dashboard/OrdersSection";
import Sidebar from "../components/Dashboard/Sidebar";
import StatCard from "../components/Dashboard/StatCard";
import TopDishesChart from "../components/Dashboard/TopDishesChart";

// استيراد نظيف: نحتاج فقط للصور الثابتة الخاصة بلوحة التحكم
import { dashboardImages } from "../data/dashboardData";

import { API, getArray, getAuthorizedToken, getJson } from "../api";

function normalizeStatus(status) {
  const value = String(status || "").toLowerCase();
  if (value === "preparing") return "preparing";
  if (value === "pending") return "pending";
  if (value === "completed" || value === "done" || value === "delivered") {
    return "completed";
  }
  if (value === "cancelled" || value === "canceled") return "cancelled";
  return "new";
}

function getCustomerType(order) {
  const value = String(
    order.status || order.order_type || order.type || order.customer_type || "",
  ).toLowerCase();

  if (
    value === "internal" ||
    value === "inside" ||
    value === "dine_in" ||
    order.is_internal
  ) {
    return "داخل المطعم";
  }
  return "زبون خارجي";
}

function formatOrderId(order, index) {
  if (order.order_number) {
    const value = String(order.order_number);
    return value.startsWith("#") ? value : `#${value}`;
  }
  if (order.code) {
    const value = String(order.code);
    return value.startsWith("#") ? value : `#${value}`;
  }
  const id = String(order.id || "");
  if (/^\d+$/.test(id)) {
    return `#ORD-${id}`;
  }
  return `#ORD-${1021 + index}`;
}

function formatOrderTime(value) {
  if (!value) return "الآن";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "الآن";
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "الآن";
  if (minutes < 60) return `منذ ${minutes} دقائق`;
  if (hours < 24) return `منذ ${hours} ساعة`;
  if (days === 1) return "أمس";

  return `منذ ${days} أيام`;
}

function getOrderTotal(order) {
  // التقاط إجمالي الطلب مهما كان اسمه في الباك إند
  const value =
    order.total_amount ||
    order.totalAmount ||
    order.total ||
    order.grand_total ||
    order.amount ||
    order.price ||
    order.total_price ||
    0;

  // تنظيف الرقم
  const cleanValue = String(value)
    .replace(/,/g, "")
    .replace(/[^\d.]/g, "");
  return Number(cleanValue) || 0;
}

function formatPrice(order) {
  const total = getOrderTotal(order);

  if (!total || isNaN(total)) {
    return "0 ل.س";
  }

  return `${total.toLocaleString("ar-SY")} ل.س`;
}

function limitText(text, maxLength = 35) {
  if (!text) return "";
  const value = String(text).trim();
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength)}...`;
}

// أزلنا الاعتماد على الصور الوهمية من هنا
function getOrderImages(order) {
  const items = order.items || [];
  const apiImages = items
    .map((item) => item.product?.image_url || item.product?.image)
    .filter(Boolean);

  if (apiImages.length > 0) {
    return apiImages;
  }

  if (Array.isArray(order.images) && order.images.length > 0) {
    return order.images;
  }

  return []; // إرجاع مصفوفة فارغة بدلاً من الصور الوهمية
}

function normalizeOrder(order, index) {
  const items = order.items || [];
  const firstItem = items[0] || {};
  const firstProduct = firstItem.product || {};
  const firstCategory = firstProduct.category || {};
  const images = getOrderImages(order); // استخدام الدالة بدون الـ index

  const orderStatus = normalizeStatus(
    order.order_status || order.progress_status || order.orderState,
  );

  const createdAt =
    order.createdAt ||
    order.created_at ||
    order.date ||
    order.orderDate ||
    order.createdDate ||
    new Date().toISOString();

  return {
    ...order,
    createdAt,
    id: formatOrderId(order, index),
    time: order.time || formatOrderTime(createdAt),
    customerName:
      order.customer_name ||
      order.customerName ||
      order.customer?.name ||
      order.user?.name ||
      "اسم العميل",
    customerType: getCustomerType(order),
    status: orderStatus,
    statusLabel:
      order.statusLabel ||
      (orderStatus === "preparing"
        ? "قيد التحضير"
        : orderStatus === "pending"
          ? "قيد الانتظار"
          : orderStatus === "completed"
            ? "مكتمل"
            : orderStatus === "cancelled"
              ? "ملغى"
              : "طلب جديد"),
    price: formatPrice(order),
    total: getOrderTotal(order),
    images,
    extraItemsCount:
      items.length > 0
        ? Math.max(items.length - 2, 0)
        : Math.max(images.length - 2, 0),
    dishName:
      firstProduct.name || order.dishName || order.product_name || "طلب جديد",
    dishTitle:
      firstProduct.name ||
      order.dishTitle ||
      order.dishName ||
      order.product_name ||
      "طبق",
    quantity:
      Number(firstItem.quantity || firstItem.qty || order.quantity || 1) || 1,
    dishDetails: limitText(
      order.notes || order.dishDetails || firstItem.notes || "بدون ملاحظات",
      35,
    ),
    categoryName:
      firstCategory.name ||
      order.categoryName ||
      order.category?.name ||
      "القسم العام",
    categoryDetails:
      order.payment_method ||
      order.paymentMethod ||
      order.categoryDetails ||
      "",
  };
}

function getOrderDate(order) {
  const value =
    order.createdAt ||
    order.created_at ||
    order.date ||
    order.orderDate ||
    order.createdDate;
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function isSameDay(dateA, dateB) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function isSameWeek(date, today) {
  const firstDay = new Date(today);
  firstDay.setDate(today.getDate() - today.getDay());
  firstDay.setHours(0, 0, 0, 0);

  const lastDay = new Date(firstDay);
  lastDay.setDate(firstDay.getDate() + 6);
  lastDay.setHours(23, 59, 59, 999);

  return date >= firstDay && date <= lastDay;
}

function buildOrdersChartData(orders, period) {
  const today = new Date();

  if (period === "day") {
    const hours = [8, 10, 12, 14, 16, 18, 20, 22];
    return hours.map((hour, index) => {
      const nextHour = hours[index + 1] || 24;
      return {
        label: String(hour),
        value: orders.filter((order) => {
          const date = getOrderDate(order);
          return (
            isSameDay(date, today) &&
            date.getHours() >= hour &&
            date.getHours() < nextHour
          );
        }).length,
      };
    });
  }

  if (period === "week") {
    const labels = ["أحد", "إثن", "ثلا", "أرب", "خمي", "جمع", "سبت"];
    return labels.map((label, dayIndex) => ({
      label,
      value: orders.filter((order) => {
        const date = getOrderDate(order);
        return isSameWeek(date, today) && date.getDay() === dayIndex;
      }).length,
    }));
  }

  if (period === "year") {
    return Array.from({ length: 12 }, (_, index) => ({
      label: String(index + 1),
      value: orders.filter((order) => {
        const date = getOrderDate(order);
        return (
          date.getFullYear() === today.getFullYear() &&
          date.getMonth() === index
        );
      }).length,
    }));
  }

  return [5, 10, 15, 20, 25, 30].map((day) => ({
    label: String(day),
    value: orders.filter((order) => {
      const date = getOrderDate(order);
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() > day - 5 &&
        date.getDate() <= day
      );
    }).length,
  }));
}

function calculateTopDishesFromOrders(orders) {
  const colors = [
    { className: "dish-color--yellow", color: "#ffd452" },
    { className: "dish-color--orange", color: "#ff891c" },
    { className: "dish-color--green", color: "#41bd60" },
    { className: "dish-color--blue", color: "#418ddd" },
  ];

  const counts = orders.reduce((acc, order) => {
    const items = order.items || [];
    if (items.length > 0) {
      items.forEach((item) => {
        const product = item.product || {};
        const title =
          product.name ||
          item.name ||
          order.dishTitle ||
          order.dishName ||
          "طبق";
        const quantity = Number(item.quantity || item.qty || 1) || 1;
        acc[title] = (acc[title] || 0) + quantity;
      });
      return acc;
    }

    const title =
      order.dishTitle || order.dishName || order.product_name || "طبق";
    const quantity = Number(order.quantity || 1) || 1;
    acc[title] = (acc[title] || 0) + quantity;
    return acc;
  }, {});

  const sortedDishes = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const total = sortedDishes.reduce((sum, [, count]) => sum + count, 0);

  if (!total) {
    return [];
  }

  const topThree = sortedDishes.slice(0, 3);
  const otherCount = sortedDishes
    .slice(3)
    .reduce((sum, [, count]) => sum + count, 0);

  const finalDishes =
    otherCount > 0 ? [...topThree, ["أطباق أخرى", otherCount]] : topThree;

  return finalDishes.map(([title, count], index) => ({
    title,
    value: count,
    percent: `${Math.round((count / total) * 100)}%`,
    className: colors[index]?.className || colors[0].className,
    color: colors[index]?.color || colors[0].color,
  }));
}

const defaultStats = [
  {
    title: "الإحصائيات",
    value: 0,
    icon: "chart",
    iconImage: dashboardImages.statsChart,
    className: "stats-card--blue",
  },
  {
    title: "الطلبات",
    value: 0,
    icon: "receipt",
    iconImage: dashboardImages.statsOrders,
    className: "stats-card--orange",
  },
  {
    title: "قيد التحضير",
    value: 0,
    icon: "chef",
    iconImage: dashboardImages.statsPreparing,
    className: "stats-card--yellow",
  },
  {
    title: "الإيرادات",
    value: "0",
    icon: "revenue",
    iconImage: dashboardImages.statsRevenue,
    className: "stats-card--green",
  },
];

function buildStats(orders, products, categories) {
  const normalizedOrders = orders.map((order, index) =>
    order.customerName ? order : normalizeOrder(order, index),
  );

  const totalRevenue = normalizedOrders.reduce((sum, order) => {
    return sum + getOrderTotal(order);
  }, 0);

  return [
    {
      title: "الإحصائيات",
      value:
        products.length ||
        categories.reduce(
          (sum, category) => sum + Number(category.products_count || 0),
          0,
        ) ||
        categories.length,
      icon: "chart",
      iconImage: dashboardImages.statsChart,
      className: "stats-card--blue",
    },
    {
      title: "الطلبات",
      value: normalizedOrders.length,
      icon: "receipt",
      iconImage: dashboardImages.statsOrders,
      className: "stats-card--orange",
    },
    {
      title: "قيد التحضير",
      value: normalizedOrders.filter((order) => order.status === "preparing")
        .length,
      icon: "chef",
      iconImage: dashboardImages.statsPreparing,
      className: "stats-card--yellow",
    },
    {
      title: "الإيرادات",
      value: totalRevenue.toLocaleString("ar-SY"),
      icon: "revenue",
      iconImage: dashboardImages.statsRevenue,
      className: "stats-card--green",
    },
  ];
}

function filterOrdersByStatus(orders, selectedStatus) {
  if (selectedStatus === "all") return orders;
  return orders.filter((order) => order.status === selectedStatus);
}

function downloadOrdersInvoice(orders) {
  const rows = [
    ["رقم الطلب", "العميل", "الحالة", "الطبق", "القسم", "السعر"],
    ...orders.map((order) => [
      order.id,
      order.customerName,
      order.statusLabel,
      order.dishName,
      order.categoryName,
      order.price,
    ]),
  ];

  const csvContent = rows
    .map((row) =>
      row
        .map((cell) => `"${String(cell || "").replaceAll('"', '""')}"`)
        .join(","),
    )
    .join("\n");

  const blob = new Blob([`\uFEFF${csvContent}`], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function Dashboard() {
  const [admin, setAdmin] = useState({
    name: "جاري التحميل...",
    role: "admin",
  });
  const [notificationCount, setNotificationCount] = useState(0);
  const [stats, setStats] = useState(defaultStats);
  const [orders, setOrders] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  useEffect(() => {
    document.body.classList.add("dashboard-page-body");
    return () => {
      document.body.classList.remove("dashboard-page-body");
    };
  }, []);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const token = await getAuthorizedToken();

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const [
          meResult,
          notificationsResult,
          ordersResult,
          productsResult,
          categoriesResult,
        ] = await Promise.all([
          getJson(API.me, token).catch(() => null),
          getJson(API.notifications, token).catch(() => null),
          getJson(API.adminOrders, token).catch(() => null),
          getJson(API.adminProducts, token).catch(() => null),
          getJson(API.adminCategories, token).catch(() => null),
        ]);

        const adminData = meResult?.data || meResult;

        if (!adminData) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        if (adminData.role !== "admin" && adminData.role !== "administrator") {
          window.location.href = "/";
          return;
        }

        setAdmin({
          name: adminData.name || "اسم الأدمن",
          role: adminData.role || "admin",
        });

        setNotificationCount(getArray(notificationsResult).length);

        const rawOrders = getArray(ordersResult);
        const rawProducts = getArray(productsResult);
        const rawCategories = getArray(categoriesResult);

        const normalizedOrders = rawOrders.map((order, i) =>
          normalizeOrder(order, i),
        );

        setOrders(normalizedOrders);
        setStats(buildStats(normalizedOrders, rawProducts, rawCategories));
      } catch (error) {
        console.log("Dashboard API error:", error.message);
        setStats(defaultStats);
        setOrders([]);
      }
    }

    loadDashboard();
  }, []);

  const visibleOrders = useMemo(() => {
    return filterOrdersByStatus(orders, selectedStatus);
  }, [orders, selectedStatus]);

  const chartData = useMemo(() => {
    return buildOrdersChartData(orders, selectedPeriod);
  }, [orders, selectedPeriod]);

  const topDishesData = useMemo(() => {
    return calculateTopDishesFromOrders(orders);
  }, [orders]);

  return (
    <div className="dashboard-page" dir="rtl">
      <Sidebar />

      <div className="dashboard-shell">
        <Header admin={admin} notificationCount={notificationCount} />

        <main className="dashboard-content">
          <div className="dashboard-content__title-row">
            <h1>إحصائيات عامة</h1>{" "}
            <button type="button" className="select-button">
              اليوم
              <Icon name="chevron" size={16} />
            </button>
          </div>

          <section className="dashboard-stats" aria-label="إحصائيات عامة">
            {stats.map((item) => (
              <StatCard key={item.title} item={item} />
            ))}
          </section>

          <section className="dashboard-charts" aria-label="رسوم بيانية">
            <OrdersAreaChart
              data={chartData}
              period={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
            />

            <TopDishesChart data={topDishesData} />
          </section>

          <OrdersSection
            orders={visibleOrders}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            onDownloadInvoice={() => downloadOrdersInvoice(visibleOrders)}
          />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
