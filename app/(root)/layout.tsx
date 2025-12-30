import Header from "@/sections/Header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen bg-white text-black font-sans">
      <Header />
      {children}
    </main>
  );
}
