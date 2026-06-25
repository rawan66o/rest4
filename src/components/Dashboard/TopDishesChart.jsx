function getColor(item) {
  const colors = {
    "dish-color--yellow": "#ffd452",
    "dish-color--orange": "#ff891c",
    "dish-color--green": "#41bd60",
    "dish-color--blue": "#418ddd",
  };

  return item.color || colors[item.className] || "#ffd452";
}

function buildDonutGradient(data) {
  const total = data.reduce((sum, item) => {
    return sum + Number(item.value || 0);
  }, 0);

  if (!total) {
    return "conic-gradient(#ffd452 0% 52%, #ff891c 52% 75%, #41bd60 75% 89%, #418ddd 89% 100%)";
  }

  let start = 0;

  const parts = data.map((item, index) => {
    const value = Number(item.value || 0);
    const percent = (value / total) * 100;
    const end = index === data.length - 1 ? 100 : start + percent;
    const color = getColor(item);

    const segment = `${color} ${start}% ${end}%`;

    start = end;

    return segment;
  });

  return `conic-gradient(${parts.join(", ")})`;
}

function TopDishesChart({ data = [] }) {
  const chartData =
    data.length > 0
      ? data
      : [
          {
            title: "شاورما",
            value: 52.1,
            percent: "52.1%",
            className: "dish-color--yellow",
            color: "#ffd452",
          },
          {
            title: "بيتزا",
            value: 22.8,
            percent: "22.8%",
            className: "dish-color--orange",
            color: "#ff891c",
          },
          {
            title: "مندي دجاج",
            value: 13.9,
            percent: "13.9%",
            className: "dish-color--green",
            color: "#41bd60",
          },
          {
            title: "أطباق أخرى",
            value: 11.2,
            percent: "11.2%",
            className: "dish-color--blue",
            color: "#418ddd",
          },
        ];

  return (
    <section className="chart-card top-dishes-card">
      <h2>الأطباق الأكثر طلباً</h2>

      <div className="top-dishes-card__content">
        <div
          className="donut-chart"
          aria-label="رسم بياني للأطباق الأكثر طلباً"
          style={{ background: buildDonutGradient(chartData) }}
        >
          <span />
        </div>

        <div className="top-dishes-list">
          {chartData.map((dish) => (
            <div className="top-dishes-list__item" key={dish.title}>
              <span className="top-dishes-list__percent">{dish.percent}</span>

              <span className="top-dishes-list__name">
                <span
                  className={`top-dishes-list__bullet ${dish.className}`}
                  style={{ backgroundColor: getColor(dish) }}
                />
                <span className="top-dishes-list__name-text">{dish.title}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopDishesChart;
