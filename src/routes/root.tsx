import { Link, Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <div>
      <header>
        <Link to="/">Sacombank</Link>
      </header>
      <Outlet />
      <footer></footer>
    </div>
  );
};
