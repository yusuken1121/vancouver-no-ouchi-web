const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <h1>header</h1>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
