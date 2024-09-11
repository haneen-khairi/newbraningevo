import { RxDashboard } from "react-icons/rx";
import VipStatistics from "../pages/statistics/vipStatistics.jsx";
import VipCars from "../pages/vip/cars";
import Vip from "../pages/vip/drivers";
import Events from "../pages/vip/events";
import VipRequests from "../pages/vip/requests";
import MyTrips from "../pages/vip/MyTrips/index.jsx";
const routes = [
  {
    path: "/home",
    inNavbar: true,
    name: "vipCar",
    element: <MyTrips />,
    permissions: ["1"],
    icon: <RxDashboard />,
  },
  {
    path: "/dashboard",
    inNavbar: true,
    name: "statistics",
    element: <VipStatistics />,
    permissions: ["Administrator"],
    icon: <RxDashboard />,
  },
  {
    path: "/orders",
    inNavbar: true,
    name: "orders",
    element: <VipRequests />,
    permissions: ["Administrator"],
    icon: <RxDashboard />,
  },
  {
    path: "/vip/cars",
    inNavbar: true,
    name: "cars",
    element: <VipCars />,
    permissions: ["Administrator"],
    icon: <RxDashboard />,
  },
  {
    path: "/vip/drivers",
    inNavbar: true,
    name: "drivers",
    element: <Vip />,
    permissions: ["Administrator"],
    icon: <RxDashboard />,
  },
  {
    path: "/vip/events",
    inNavbar: true,
    name: "events",
    element: <Events />,
    permissions: ["Administrator"],
    icon: <RxDashboard />,
  },
];

export default routes;
