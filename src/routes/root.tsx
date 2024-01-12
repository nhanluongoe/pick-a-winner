import { Link, Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <div className="container mx-auto p-8">
      <header className="mb-3">
        <Link to="/">
          <img src="/logo-sc.png" width="300px" />
        </Link>
      </header>
      <Outlet />
      <footer></footer>
    </div>
  );
};
