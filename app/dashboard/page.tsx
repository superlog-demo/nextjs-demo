const stats = [
  { label: "Open orders", value: "14" },
  { label: "Active users", value: "128" },
  { label: "API checks", value: "99.9%" }
];

const activity = [
  "Order sync completed",
  "User profile refreshed",
  "Health check returned ok"
];

export default function DashboardPage() {
  return (
    <>
      <section>
        <p className="eyebrow">Dashboard</p>
        <h1>Operations snapshot</h1>
        <p>Server-rendered sample data for route and page traversal tests.</p>
      </section>

      <section className="stats" aria-label="Dashboard metrics">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <span>{stat.value}</span>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      <ul className="list" aria-label="Recent activity">
        {activity.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
