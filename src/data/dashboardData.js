const publicImage = (fileName) =>
  `${process.env.PUBLIC_URL || ""}/images/${encodeURIComponent(fileName)}`;

export const dashboardImages = {
  logo: publicImage("logo.png"),
  adminAvatar: publicImage("Ellipse 4.png"),
  notificationBell: publicImage("BellSimpleRinging.png"),

  statsChart: publicImage("Vector.png"),
  statsOrders: publicImage("Vector (1).png"),
  statsPreparing: publicImage("Vector (2).png"),
  statsRevenue: publicImage("Vector (3).png"),

  meal: publicImage("meal.png"),
  pizza: publicImage("pizza.png"),
  burger: publicImage("burger.png"),
  sushi: publicImage("sushi.png"),
  appetizer: publicImage("appetizer.png"),
  chicken: publicImage("chicken.png"),
  dessert: publicImage("dessert.png"),
  juice: publicImage("juice.png"),
  hotDrink: publicImage("hot-drink.png"),

  sidebarDashboard: publicImage("Vector(9).png"),
  sidebarMenu: publicImage("Vector(10).png"),
  sidebarOrders: publicImage("Vector(11).png"),
  sidebarUsers: publicImage("Vector(12).png"),
};

export const logo = dashboardImages.logo;

export const sidebarItems = [
  {
    title: "لوحة التحكم",
    icon: "dashboard",
    iconImage: dashboardImages.sidebarDashboard,
    active: true,
  },
  {
    title: "إدارة المينيو",
    icon: "menu",
    iconImage: dashboardImages.sidebarMenu,
  },
  {
    title: "إدارة الطلبات",
    icon: "orders",
    iconImage: dashboardImages.sidebarOrders,
  },
  {
    title: "إدارة المستخدمين",
    icon: "users",
    iconImage: dashboardImages.sidebarUsers,
  },
];