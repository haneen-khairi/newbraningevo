import { Outlet } from "react-router-dom";
import { Flex, Card, Checkbox, Divider, Calendar, Button, Badge } from "antd";
import DashboardHeader from "./dashboardHeader";
import { useTranslation } from "react-i18next";
import CustomTypograhy from "../components/Typography.jsx";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useLocation, useNavigate, Link, matchPath } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import RoutesContext from "../contexts/routesContext.js";
import flattenNestedArray from "../utils/flattenArray.js";
import "dayjs/locale/ar.js";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRequests } from "@/services/requests";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import useTheme from "../hooks/useTheme.js";
import useBuildings from "../hooks/useBuildings.js";
import SideBarItem from "../components/CalendarBarItem.jsx";
import RequestDrawer from "../pages/request/requestDrawer.jsx";
import { usePageInfo } from "../contexts/PageInfoContext.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "../pages/error.jsx";
import { setIsSamlLoading } from "../slices/samlLoading.js";
import { useDispatch } from "react-redux";

function DashboardLayout(props) {
    
  const samlDispatch = useDispatch();
  samlDispatch(setIsSamlLoading(false));
  const location = useLocation();
  const navigate = useNavigate();
  const { ability } = useSelector((state) => state.ability);
  const { user } = useSelector((state) => state.auth);
  const { routes } = useContext(RoutesContext);
  const { data: buildings } = useBuildings({
    isActive: true,
    isGetAll: true,
  });
  const { pageInfo, setPageInfo } = usePageInfo();
  const [requestDrawerVisible, setRequestDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState({}); // [{id, name, count}
  const [selectedDate, setSelectedDate] = useState(null);
  const { token } = useTheme();
  const { i18n } = useTranslation();
  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const requests = useQuery({
    queryKey: ["requests"],
    queryFn: () => fetchAllRequests({ isUpcoming: true }),
    enabled: false,
  });
  const { t } = useTranslation();

  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <div className="h-screen flex flex-col">
        <DashboardHeader />
        <div
          style={{
            width: "100%",
            backgroundColor: token.bodyColor,
            position: "relative",
            flexGrow: 1,
          }}
        >
          <Flex
            style={{
              position: "relative",
              top: "-5vh",
              width: "90%",
              height: "fit-content",
              margin: "0 auto",
            }}
            gap={30}
            justify={"space-between"}
          >
            <Flex className="w-full">
              <Outlet />
            </Flex>
            {pageInfo.hasSideBar &&
              (ability.can("manage", "Requests") ||
                ability.can("manage", "RequestsScreens")) && (
                <Card
                  style={{
                    flexBasis: "15%",
                    display: isDesktopOrLaptop ? "block" : "none",
                    border: "none",
                    boxShadow: token.cardShadow,
                  }}
                >
                  {ability.can("manage", "RequestsScreens") && (
                    <Link to="/publictable" target="_blank">
                      <Button type="primary" className="w-full">
                        {t("publicTable")}
                      </Button>
                    </Link>
                  )}
                  <Divider />
                  {ability.can("manage", "Requests") && (
                    <Calendar
                      fullscreen={false}
                      headerRender={({ value, type, onChange }) => {
                        return (
                          <Flex
                            vertical
                            style={{
                              marginBottom: "10px",
                            }}
                            gap={10}
                          >
                            <p
                              style={{
                                fontSize: "19px",
                              }}
                            >
                              {t("requests")}
                            </p>
                            <Flex justify="space-between" align="center">
                              <Button
                                onClick={(e) =>
                                  onChange(dayjs(value).subtract(1, "month"))
                                }
                              >
                                <MdKeyboardDoubleArrowRight />
                              </Button>
                              <CustomTypograhy
                                fontSize={"12px"}
                                variant={"secondary"}
                              >
                                {value.format("MMMM YYYY")}
                              </CustomTypograhy>
                              <Button
                                onClick={(e) =>
                                  onChange(dayjs(value).add(1, "month"))
                                }
                              >
                                <MdKeyboardDoubleArrowLeft />
                              </Button>
                            </Flex>
                          </Flex>
                        );
                      }}
                      onSelect={(date) => {
                        setSelectedDate(date);
                      }}
                      cellRender={(date) => {
                        //check if date is in requests
                        //if yes, return a div with a custom styling
                        //else return null
                        if (requests.data) {
                          const found = requests.data.data.find(
                            (request) =>
                              dayjs(request.validFrom).format("YYYY-MM-DD") ===
                              date.format("YYYY-MM-DD")
                          );
                          if (found) {
                            return (
                              <div className="absolute -bottom-2 left-2 rounded-full bg-[#38ACB1] w-2 h-2"></div>
                            );
                          }
                        }
                      }}
                    />
                  )}
                  <div className="flex overflow-auto flex-col gap-3">
                    {requests.data?.data
                      ?.filter((request) => {
                        return (
                          dayjs(request.validFrom).format("YYYY-MM-DD") ===
                          selectedDate?.format("YYYY-MM-DD")
                        );
                      })
                      .map((request) => {
                        return (
                          <SideBarItem
                            request={request}
                            token={token}
                            building={buildings?.data?.find(
                              (building) => building.id === request.buildingId
                            )}
                            onSelect={(request) => {
                              setDrawerData(request);
                              setRequestDrawerVisible(true);
                            }}
                          />
                        );
                      })}
                  </div>
                </Card>
              )}
          </Flex>
        </div>
        <RequestDrawer
          drawerVisible={requestDrawerVisible}
          closeDrawer={() => setRequestDrawerVisible(false)}
          invite={drawerData}
        />
      </div>
    </ErrorBoundary>
  );
}

DashboardLayout.isPrivate = true;
export default DashboardLayout;
