import { Link, Outlet, useLocation } from "react-router-dom";

export const Root = () => {
  const location = useLocation();

  const homepage = location.pathname === "/";

  return (
    <div className="bg-main bg-cover">
      <div className="container mx-auto p-8 h-screen flex flex-col">
        <header className={`mb-12 ${homepage ? "flex justify-center" : ""}`}>
          <Link to="/" className="inline-block">
            <img src="/logo-sc.png" width="250px" />
          </Link>
        </header>
        <div className="flex-1">
          <Outlet />
        </div>
        <footer></footer>
      </div>
    </div>
  );
};
