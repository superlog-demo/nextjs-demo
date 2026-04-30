import Link from "next/link";

const features = [
  {
    title: "Server routes",
    body: "Health, order, and user endpoints exercise common API patterns."
  },
  {
    title: "App Router pages",
    body: "Static, dynamic, and server-rendered pages are ready for smoke tests."
  },
  {
    title: "Small surface area",
    body: "The project stays compact enough to inspect during demo workflows."
  }
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Superlog demo fixture</p>
        <h1>Next.js App Router test repo</h1>
        <p>
          A compact application with pages and server routes for testing
          instrumentation, repository analysis, and generated changes.
        </p>
        <div className="actions">
          <Link className="button" href="/dashboard">
            View dashboard
          </Link>
          <Link className="button secondary" href="/api/health">
            Check health
          </Link>
        </div>
      </section>

      <section className="grid" aria-label="Included features">
        {features.map((feature) => (
          <article className="card" key={feature.title}>
            <strong>{feature.title}</strong>
            <p>{feature.body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
