type ItemPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ItemPage({ params }: ItemPageProps) {
  const { slug } = await params;

  return (
    <section className="hero">
      <p className="eyebrow">Item detail</p>
      <h1>{slug}</h1>
      <p>
        Dynamic item page for exercising Next.js route params and generated
        navigation.
      </p>
    </section>
  );
}
