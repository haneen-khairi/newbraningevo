import CustomCard from "@/components/CardWithHeader";
import StatusButton from "@/components/restaurant/StatusButton";
import { FaUber } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ButtonGroup from "@/components/CustomButtonGroup";
import { useSearchParams } from "react-router-dom";
import VipCategories from "./categories";
import VipCars from "./cars";
import Drivers from "./drivers";

export default function Vip() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("active_tab") || "requests";
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-6 gap-4">
        <StatusButton
          color={"#0070DF"}
          text={t("drivers")}
          icon={
            <svg
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12C13.309 12 16 9.309 16 6C16 2.691 13.309 0 10 0C6.69102 0 4.00002 2.691 4.00002 6C4.00002 9.309 6.69102 12 10 12ZM10 3C11.654 3 13 4.346 13 6C13 7.654 11.654 9 10 9C8.34602 9 7.00002 7.654 7.00002 6C7.00002 4.346 8.34602 3 10 3ZM14.934 22.286C15.053 23.106 14.577 24 13.448 24C12.715 24 12.073 23.461 11.966 22.714C11.824 21.736 10.98 21 10.001 21C9.02202 21 8.17702 21.737 8.03602 22.714C7.91802 23.534 7.15802 24.103 6.33702 23.984C5.51702 23.866 4.94802 23.105 5.06702 22.285C5.42002 19.842 7.54102 17.999 10.001 17.999C12.461 17.999 14.583 19.841 14.935 22.285L14.934 22.286ZM19.972 22.413C20.02 23.24 19.389 23.95 18.562 23.998C18.532 23.999 18.502 24 18.473 24C17.684 24 17.023 23.385 16.977 22.587C16.762 18.893 13.697 16 10 16C6.30302 16 3.23802 18.894 3.02302 22.587C2.97502 23.414 2.26302 24.04 1.43802 23.997C0.611018 23.949 -0.0199817 23.239 0.0280183 22.412C0.336018 17.134 4.71602 12.999 10 12.999C15.284 12.999 19.664 17.134 19.972 22.413Z"
                fill="#0070DF"
              />
            </svg>
          }
          count={10}
          bgcolor="white"
        />
        <StatusButton
          color={"#E98484"}
          text={t("cars")}
          icon={
            <svg
              width="25"
              height="22"
              viewBox="0 0 25 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 7.50005C24.5 7.10222 24.342 6.72069 24.0607 6.43939C23.7794 6.15808 23.3978 6.00005 23 6.00005C23 6.00005 22.416 6.00005 22.375 6.00805C21.6272 4.62258 20.7705 3.29875 19.813 2.04905C19.3134 1.39935 18.621 0.924352 17.835 0.692049C16.074 -0.163951 8.926 -0.163951 7.165 0.692049C6.379 0.924352 5.68664 1.39935 5.187 2.04905C4.22945 3.29875 3.37275 4.62258 2.625 6.00805C2.584 6.00005 2 6.00005 2 6.00005C1.60218 6.00005 1.22064 6.15808 0.93934 6.43939C0.658035 6.72069 0.5 7.10222 0.5 7.50005L0.5 14C0.500193 14.702 0.68511 15.3916 1.03617 15.9994C1.38724 16.6073 1.89208 17.1121 2.5 17.463V19C2.5 19.7957 2.81607 20.5588 3.37868 21.1214C3.94129 21.684 4.70435 22 5.5 22C6.29565 22 7.05871 21.684 7.62132 21.1214C8.18393 20.5588 8.5 19.7957 8.5 19V18H16.5V19C16.5 19.7957 16.8161 20.5588 17.3787 21.1214C17.9413 21.684 18.7044 22 19.5 22C20.2956 22 21.0587 21.684 21.6213 21.1214C22.1839 20.5588 22.5 19.7957 22.5 19V17.463C23.1079 17.1121 23.6128 16.6073 23.9638 15.9994C24.3149 15.3916 24.4998 14.702 24.5 14V7.50005ZM6.774 3.26605C7.01898 2.95012 7.35736 2.71951 7.741 2.60705C9.26 1.85605 15.741 1.85605 17.259 2.60705C17.6426 2.71951 17.981 2.95012 18.226 3.26605C19.7446 5.2573 20.9953 7.43927 21.946 9.75605C15.6818 8.84204 9.31817 8.84204 3.054 9.75605C4.0047 7.43927 5.25538 5.2573 6.774 3.26605ZM6.5 19C6.5 19.2653 6.39464 19.5196 6.20711 19.7072C6.01957 19.8947 5.76522 20 5.5 20C5.23478 20 4.98043 19.8947 4.79289 19.7072C4.60536 19.5196 4.5 19.2653 4.5 19V18H6.5V19ZM20.5 19C20.5 19.2653 20.3946 19.5196 20.2071 19.7072C20.0196 19.8947 19.7652 20 19.5 20C19.2348 20 18.9804 19.8947 18.7929 19.7072C18.6054 19.5196 18.5 19.2653 18.5 19V18H20.5V19ZM20.5 16H4.5C3.96957 16 3.46086 15.7893 3.08579 15.4143C2.71071 15.0392 2.5 14.5305 2.5 14V11.857C5.81076 11.3509 9.1514 11.0646 12.5 11C15.8486 11.0646 19.1892 11.3509 22.5 11.857V14C22.5 14.5305 22.2893 15.0392 21.9142 15.4143C21.5391 15.7893 21.0304 16 20.5 16ZM6.5 14C6.5 14.2653 6.39464 14.5196 6.20711 14.7072C6.01957 14.8947 5.76522 15 5.5 15C5.23478 15 4.98043 14.8947 4.79289 14.7072C4.60536 14.5196 4.5 14.2653 4.5 14C4.5 13.7348 4.60536 13.4805 4.79289 13.2929C4.98043 13.1054 5.23478 13 5.5 13C5.76522 13 6.01957 13.1054 6.20711 13.2929C6.39464 13.4805 6.5 13.7348 6.5 14ZM20.5 14C20.5 14.2653 20.3946 14.5196 20.2071 14.7072C20.0196 14.8947 19.7652 15 19.5 15C19.2348 15 18.9804 14.8947 18.7929 14.7072C18.6054 14.5196 18.5 14.2653 18.5 14C18.5 13.7348 18.6054 13.4805 18.7929 13.2929C18.9804 13.1054 19.2348 13 19.5 13C19.7652 13 20.0196 13.1054 20.2071 13.2929C20.3946 13.4805 20.5 13.7348 20.5 14Z"
                fill="#E98484"
              />
            </svg>
          }
          count={10}
          bgcolor="white"
        />
        <StatusButton
          color={"#FE8800"}
          text={t("currentRequests")}
          icon={
            <svg
              width="18"
              height="24"
              viewBox="0 0 18 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9973 24H4.00234C3.42406 23.9997 2.85267 23.8744 2.32729 23.6328C1.8019 23.3912 1.33493 23.0389 0.958343 22.6C0.587055 22.1707 0.312894 21.6663 0.154625 21.1212C-0.00364482 20.5762 -0.0422868 20.0034 0.0413434 19.442C0.578255 16.5175 2.13831 13.8795 4.44234 12C2.13828 10.1199 0.578549 7.48109 0.0423436 4.556C-0.0411229 3.99502 -0.00249179 3.42262 0.155597 2.87794C0.313686 2.33326 0.587506 1.82913 0.958343 1.4C1.33493 0.961146 1.8019 0.608844 2.32729 0.36721C2.85267 0.125575 3.42406 0.000313842 4.00234 0L13.9973 0C14.5756 0.000512143 15.1469 0.125862 15.6723 0.367483C16.1976 0.609104 16.6646 0.9613 17.0413 1.4C17.4122 1.82895 17.6862 2.33285 17.8446 2.87732C18.0031 3.42179 18.0422 3.99403 17.9593 4.555C17.4177 7.48095 15.8544 10.1194 13.5483 12C15.8531 13.8822 17.4146 16.5217 17.9543 19.448C18.0373 20.0091 17.9982 20.5815 17.8398 21.1262C17.6813 21.6708 17.4073 22.1749 17.0363 22.604C16.6598 23.0413 16.1934 23.3924 15.669 23.6333C15.1446 23.8742 14.5744 23.9993 13.9973 24ZM13.9973 2H4.00234C3.71228 1.99982 3.42559 2.06227 3.16188 2.18308C2.89816 2.30389 2.66364 2.48022 2.47434 2.7C2.2895 2.91043 2.1529 3.15874 2.07413 3.42753C1.99536 3.69632 1.97632 3.97908 2.01834 4.256C2.39434 6.756 3.94234 9.096 6.61834 11.213C6.73659 11.3066 6.83212 11.4258 6.89779 11.5615C6.96347 11.6973 6.99758 11.8462 6.99758 11.997C6.99758 12.1478 6.96347 12.2967 6.89779 12.4325C6.83212 12.5682 6.73659 12.6874 6.61834 12.781C3.94234 14.9 2.39734 17.242 2.01834 19.741C1.97587 20.0184 1.99468 20.3017 2.07346 20.5711C2.15224 20.8404 2.28908 21.0892 2.47434 21.3C2.66364 21.5198 2.89816 21.6961 3.16188 21.8169C3.42559 21.9377 3.71228 22.0002 4.00234 22H13.9973C14.2874 22.0002 14.5741 21.9378 14.8379 21.817C15.1016 21.6962 15.3361 21.5198 15.5253 21.3C15.7101 21.0899 15.8467 20.842 15.9255 20.5735C16.0043 20.3051 16.0233 20.0226 15.9813 19.746C15.6083 17.259 14.0613 14.917 11.3813 12.784C11.2638 12.6903 11.1689 12.5714 11.1037 12.436C11.0385 12.3006 11.0046 12.1523 11.0046 12.002C11.0046 11.8517 11.0385 11.7034 11.1037 11.568C11.1689 11.4326 11.2638 11.3137 11.3813 11.22C14.0623 9.087 15.6093 6.745 15.9813 4.257C16.0232 3.97955 16.0036 3.69629 15.9239 3.42725C15.8443 3.1582 15.7065 2.90994 15.5203 2.7C15.3316 2.4808 15.0979 2.30482 14.8351 2.18403C14.5723 2.06324 14.2866 2.00047 13.9973 2ZM12.6783 20H5.31534C5.15172 19.9999 4.99062 19.9597 4.84616 19.8829C4.7017 19.806 4.57831 19.6949 4.4868 19.5593C4.39529 19.4236 4.33846 19.2676 4.32129 19.1049C4.30412 18.9422 4.32715 18.7777 4.38834 18.626C5.17142 16.9351 6.36455 15.4666 7.85934 14.354L8.37734 13.942C8.5543 13.8012 8.77373 13.7246 8.99984 13.7246C9.22595 13.7246 9.44539 13.8012 9.62234 13.942L10.1313 14.348C11.624 15.465 12.8171 16.934 13.6043 18.624C13.6659 18.7758 13.6893 18.9403 13.6724 19.1033C13.6555 19.2662 13.5988 19.4224 13.5074 19.5583C13.4159 19.6942 13.2925 19.8055 13.1479 19.8826C13.0034 19.9596 12.8421 19.9999 12.6783 20ZM7.03134 18H10.9593C10.3888 17.2563 9.72994 16.5847 8.99734 16C8.2615 16.5824 7.60109 17.2543 7.03134 18Z"
                fill="#FE8800"
              />
            </svg>
          }
          count={10}
          bgcolor="white"
        />
        <StatusButton
          color={"#219653"}
          text={t("completedRequests")}
          icon={
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.714 9.098C19.101 9.492 19.095 10.125 18.7 10.512L14.274 14.857C13.491 15.625 12.483 16.008 11.474 16.008C10.476 16.008 9.478 15.632 8.698 14.879L6.799 13.012C6.405 12.625 6.4 11.992 6.787 11.598C7.173 11.203 7.808 11.198 8.201 11.586L10.094 13.447C10.87 14.197 12.095 14.193 12.875 13.429L17.3 9.085C17.693 8.697 18.324 8.704 18.714 9.098ZM24.5 12C24.5 18.617 19.117 24 12.5 24C5.883 24 0.5 18.617 0.5 12C0.5 5.383 5.883 0 12.5 0C19.117 0 24.5 5.383 24.5 12ZM22.5 12C22.5 6.486 18.014 2 12.5 2C6.986 2 2.5 6.486 2.5 12C2.5 17.514 6.986 22 12.5 22C18.014 22 22.5 17.514 22.5 12Z"
                fill="#219653"
              />
            </svg>
          }
          count={10}
          bgcolor="white"
        />
        <StatusButton
          color={"#F30000"}
          text={t("incompleteRequests")}
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_732_615)">
                <path
                  d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913451 7.4078C0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.8071 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0866C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C23.9966 8.81846 22.7312 5.76821 20.4815 3.51852C18.2318 1.26883 15.1815 0.00344108 12 0ZM12 22C10.0222 22 8.08879 21.4135 6.4443 20.3147C4.79981 19.2159 3.51809 17.6541 2.76121 15.8268C2.00433 13.9996 1.8063 11.9889 2.19215 10.0491C2.578 8.10929 3.53041 6.32746 4.92894 4.92893C6.32746 3.53041 8.10929 2.578 10.0491 2.19215C11.9889 1.8063 13.9996 2.00433 15.8268 2.7612C17.6541 3.51808 19.2159 4.79981 20.3147 6.4443C21.4135 8.08879 22 10.0222 22 12C21.9971 14.6513 20.9426 17.1931 19.0679 19.0679C17.1931 20.9426 14.6513 21.9971 12 22Z"
                  fill="#F30000"
                />
                <path
                  d="M12 5C11.7348 5 11.4804 5.10536 11.2929 5.29289C11.1054 5.48043 11 5.73478 11 6V14C11 14.2652 11.1054 14.5196 11.2929 14.7071C11.4804 14.8946 11.7348 15 12 15C12.2652 15 12.5196 14.8946 12.7071 14.7071C12.8946 14.5196 13 14.2652 13 14V6C13 5.73478 12.8946 5.48043 12.7071 5.29289C12.5196 5.10536 12.2652 5 12 5Z"
                  fill="#F30000"
                />
                <path
                  d="M13 18C13 17.4477 12.5523 17 12 17C11.4477 17 11 17.4477 11 18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18Z"
                  fill="#F30000"
                />
              </g>
              <defs>
                <clipPath id="clip0_732_615">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          }
          count={10}
          bgcolor="white"
        />
        <StatusButton
          color={"#757575"}
          text={t("cancelledRequests")}
          icon={
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_732_612)">
                <path
                  d="M16.5 8.00006C16.3125 7.81259 16.0582 7.70728 15.793 7.70728C15.5278 7.70728 15.2735 7.81259 15.086 8.00006L12.5 10.5861L9.91401 8.00006C9.72541 7.8179 9.47281 7.71711 9.21061 7.71939C8.94841 7.72167 8.6976 7.82684 8.51219 8.01224C8.32678 8.19765 8.22162 8.44846 8.21934 8.71066C8.21706 8.97286 8.31785 9.22546 8.50001 9.41406L11.086 12.0001L8.50001 14.5861C8.31785 14.7747 8.21706 15.0273 8.21934 15.2895C8.22162 15.5517 8.32678 15.8025 8.51219 15.9879C8.6976 16.1733 8.94841 16.2785 9.21061 16.2807C9.47281 16.283 9.72541 16.1822 9.91401 16.0001L12.5 13.4141L15.086 16.0001C15.2746 16.1822 15.5272 16.283 15.7894 16.2807C16.0516 16.2785 16.3024 16.1733 16.4878 15.9879C16.6732 15.8025 16.7784 15.5517 16.7807 15.2895C16.783 15.0273 16.6822 14.7747 16.5 14.5861L13.914 12.0001L16.5 9.41406C16.6875 9.22653 16.7928 8.97223 16.7928 8.70706C16.7928 8.4419 16.6875 8.18759 16.5 8.00006Z"
                  fill="#757575"
                />
                <path
                  d="M12.5 0C10.1266 0 7.80655 0.703788 5.83316 2.02236C3.85977 3.34094 2.3217 5.21509 1.41345 7.4078C0.505199 9.60051 0.267559 12.0133 0.730582 14.3411C1.1936 16.6689 2.33649 18.8071 4.01472 20.4853C5.69295 22.1635 7.83115 23.3064 10.1589 23.7694C12.4867 24.2324 14.8995 23.9948 17.0922 23.0866C19.2849 22.1783 21.1591 20.6402 22.4776 18.6668C23.7962 16.6935 24.5 14.3734 24.5 12C24.4966 8.81846 23.2312 5.76821 20.9815 3.51852C18.7318 1.26883 15.6815 0.00344108 12.5 0ZM12.5 22C10.5222 22 8.58879 21.4135 6.9443 20.3147C5.29981 19.2159 4.01809 17.6541 3.26121 15.8268C2.50433 13.9996 2.3063 11.9889 2.69215 10.0491C3.078 8.10929 4.03041 6.32746 5.42894 4.92893C6.82746 3.53041 8.60929 2.578 10.5491 2.19215C12.4889 1.8063 14.4996 2.00433 16.3268 2.7612C18.1541 3.51808 19.7159 4.79981 20.8147 6.4443C21.9135 8.08879 22.5 10.0222 22.5 12C22.4971 14.6513 21.4426 17.1931 19.5679 19.0679C17.6931 20.9426 15.1513 21.9971 12.5 22Z"
                  fill="#787878"
                />
              </g>
              <defs>
                <clipPath id="clip0_732_612">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          }
          count={10}
          bgcolor="white"
        />
      </div>
      <CustomCard>
        <ButtonGroup
          value={currentTab}
          onChange={(e) => {
            setSearchParams({ active_tab: e.target.value });
          }}
          options={[
            { label: t("vipRequests"), value: "requests" },
            { label: t("vipDrivers"), value: "drivers" },
            { label: t("cars"), value: "cars" },
            { label: t("categories"), value: "categories" },
          ]}
        />
        {currentTab == "categories" && <VipCategories />}
        {currentTab == "requests" && <div>Requests</div>}
        {currentTab == "cars" && <VipCars />}
        {currentTab == "drivers" && <Drivers />}
      </CustomCard>
    </div>
  );
}
