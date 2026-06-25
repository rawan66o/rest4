function OrdersAreaChart({
  data = [],
  period = "month",
  onPeriodChange = () => {},
}) {
  const chartData =
    data.length > 0
      ? data
      : [
          { label: "30", value: 8 },
          { label: "25", value: 18 },
          { label: "20", value: 9 },
          { label: "15", value: 30 },
          { label: "10", value: 8 },
          { label: "5", value: 6 },
        ];

  const maxValue = 30;
  const width = 460;
  const height = 190;
  const paddingX = 20;
  const paddingTop = 18;
  const paddingBottom = 28;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingTop - paddingBottom;

  const points = chartData.map((item, index) => {
    const x =
      chartData.length === 1
        ? width / 2
        : paddingX + (index / (chartData.length - 1)) * chartWidth;

    const y = paddingTop + chartHeight - (item.value / maxValue) * chartHeight;

    return { x, y, ...item };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${
          height - paddingBottom
        } L ${points[0].x} ${height - paddingBottom} Z`
      : "";

  const periodLabel =
    period === "day"
      ? "اليوم"
      : period === "week"
        ? "الأسبوع"
        : period === "year"
          ? "السنة"
          : "الشهر";

  return (
    <section className="chart-card orders-chart-card">
      <div className="chart-card__header">
        <h2>أداء الطلبات خلال هذا الشهر</h2>{" "}
        <label className="select-button">
          <select
            value={period}
            onChange={(event) => onPeriodChange(event.target.value)}
            aria-label="تحديد مدة الرسم البياني"
          >
            <option value="day">اليوم</option>
            <option value="week">الأسبوع</option>
            <option value="month">الشهر</option>
            <option value="year">السنة</option>
          </select>

          <span>{periodLabel}</span>
        </label>
      </div>

      <div className="orders-chart">
        <div className="orders-chart__grid" />

        <svg className="orders-chart__svg" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff8a1c" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ff8a1c" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#ordersGradient)" />
          <path
            d={linePath}
            fill="none"
            stroke="#ff8a1c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="orders-chart__y-axis">
          <span>30K</span>
          <span>20K</span>
          <span>10K</span>
          <span>0</span>
        </div>

        <div className="orders-chart__x-axis">
          {chartData.map((item) => (
            <span key={item.label}>{item.label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OrdersAreaChart;
