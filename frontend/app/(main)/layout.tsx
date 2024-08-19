const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="h-[8vh] bg-slate-800 mb-7">
        <h1 className="text-white text-2xl">header</h1>
      </div>

      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
