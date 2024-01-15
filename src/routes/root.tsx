import { Link, Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <div className="">
      <div className="container mx-auto p-8 h-screen flex flex-col">
        <header className="mb-12">
          <Link to="/">
            <img src="/logo-sc.png" width="300px" />
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
