import { Link, Outlet } from "react-router-dom";

interface MenuItem {
  id: string;
  path: string;  element?: JSX.Element;
  name: string;
}

const menu: MenuItem[] = [
  {
    id: "prizes",
    path: "prizes",
    name: "Giải thưởng"
  },
  {
    id: "members",
    path: "members",
    name: "Người tham dự"
  },
  {
    id: "awards",
    path: "awards",
    name: "Kết quả trúng thưởng"
  },
];

export const Configuration = () => {
  return (
    <div className="grid grid-cols-12 gap-3">
      <nav className="col-span-2 border-r border-blue-300">
        <ul className="flex flex-col gap-8">
          {menu.map((item) => (
            <li key={item.id}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="col-span-10">
        <Outlet />
      </div>
    </div>
  );
};
