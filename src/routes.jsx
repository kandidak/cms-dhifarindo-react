import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  PaperClipIcon,
} from "@heroicons/react/24/solid";
import { Home, Tables, Notifications } from "@/pages/dashboard";
import Users from "@/pages/users/users";
import { SignIn, SignUp } from "@/pages/auth";
import Trainings from "./pages/trainings/trainings";
import { Contact } from "./pages/customers/customers";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "users",
        path: "/users",
        element: <Users />,
      },
      {
        icon: <PaperClipIcon {...icon} />,
        name: "trainings",
        path: "/trainings",
        element: <Trainings />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "contact",
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ArrowRightOnRectangleIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <UserPlusIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;
