import UserProfile from "@/pages/user/index.jsx";
import Settings from "@/pages/settings/index.jsx";
import AllNotifications from "@/pages/notifications/index.jsx";
import { FaClockRotateLeft } from "react-icons/fa6";
import ConditonalRedirect from "@/pages/conditionalredirect.jsx";

export default [
  {
    path: "/",
    inNavbar: false,
    hasSidebar: false,
    exact: true,
    element: <ConditonalRedirect />,
  },
  {
    path: "/notifications",
    inNavbar: false,
    name: "notifications",
    hasSidebar: false,
    element: <AllNotifications />,
  },
  {
    path: "/profile",
    inNavbar: false,
    name: "profile",
    hasSidebar: false,
    element: <UserProfile />,
    icon: <FaClockRotateLeft />,
  },
  {
    path: "/settings",
    inNavbar: false,
    name: "settings",
    hasSidebar: false,
    element: <Settings />,
  },
];
