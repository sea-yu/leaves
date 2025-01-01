import { Outlet } from "react-router-dom";
import Header from "@/layout/header";
import { Providers } from "@/providers";

function Layout() {
  return (
    <Providers>
      <Header />
      <main className="p-16 min-h-[calc(100vh-4rem-1px)]">
        <Outlet />
      </main>
    </Providers>
  );
}

export default Layout;
