import { Outlet } from "react-router-dom";

interface MenuItem {
  id: string;
  path: string;
  element?: JSX.Element;
}

const menu: MenuItem[] = [
  {
    id: "prizes",
    path: "prizes",
  },
  {
    id: "members",
    path: "members",
  },
  {
    id: "awards",
    path: "awards",
  },
];

export const Configuration = () => {
  return (
    <div>
      <nav>
        <ul>
          {menu.map((item) => (
            <li key={item.id}>
              <a href={`/configuration/${item.path}`}>{item.id}</a>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};
