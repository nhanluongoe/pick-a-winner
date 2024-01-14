import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

interface MenuItem {
  id: string;
  path: string;
  name: string;
  iconSrc?: string;
}

const menu: MenuItem[] = [
  {
    id: "prizes",
    path: "prizes",
    name: "Cấu hình giải thưởng",
    iconSrc: "/menu_prizes.svg",
  },
  {
    id: "members",
    path: "members",
    name: "Cấu hình người tham dự",
    iconSrc: "/menu_members.svg",
  },
  {
    id: "awards",
    path: "awards",
    name: "Kết quả trúng thưởng",
    iconSrc: "/menu_awards.svg",
  },
];

export const Configuration = () => {
  const [selected, setSelected] = useState<string>("prizes");

  return (
    <div className="grid grid-cols-12 gap-3 h-full">
      <nav className="col-span-3 border-r-2 border-gray-300">
        <ul className="flex flex-col gap-8 p-2">
          {menu.map((item) => (
            <li
              key={item.id}
              className={`${
                selected === item.id ? "bg-gray-100" : ""
              } rounded-md`}
              onClick={() => {
                setSelected(item.id);
              }}
            >
              <Link
                to={item.path}
                className="w-full h-full flex items-center p-2 rounded-md"
              >
                {item.iconSrc && <img src={item.iconSrc} className="mr-2" />}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="col-span-9">
        <Outlet />
      </div>
    </div>
  );
};
