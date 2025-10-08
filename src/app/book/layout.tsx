export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </section>
  );
}
