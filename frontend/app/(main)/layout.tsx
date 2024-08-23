import Header from "@/components/organisms/Header";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="py-2 base-px flex-1 overflow-y-auto z-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
