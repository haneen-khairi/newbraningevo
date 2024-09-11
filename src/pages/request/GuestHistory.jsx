import CustomCard from "@/components/CardWithHeader";
import InviteDetailsHeader from "./components/InviteDetailsHeader";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchOneRequest } from "@/services/requests";
import { FaRegUser } from "react-icons/fa";
import IconWithText from "../../components/IconWithText";
import { useTranslation } from "react-i18next";
import { MdAlternateEmail } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaRegAddressCard } from "react-icons/fa";
import { FaCarAlt } from "react-icons/fa";
import { MdNumbers } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { cloneElement } from "react";
import ComplexTable from "../../components/ComplexTable";
import SubtitleText from "../../components/Subtitle";
export default function GuestHistory() {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const requestId = searchParams.get("requestId");
  const { data: requestDetails } = useQuery({
    queryKey: ["request", requestId],
    queryFn: () => fetchOneRequest(requestId),
  });
  return (
    <CustomCard className="w-10/12 mx-auto">
      {/* <div className="border border-solid border-slate-200 p-4 rounded-lg mb-4 ">
        <div className="pb-3 border-b border-b-gray-200 border-solid">
          <SubtitleText>{t("guestDetails")}</SubtitleText>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-2">
          <IconWithText>
            <PreFormattedIcon>
              <FaRegUser />
            </PreFormattedIcon>
            <span>{requestDetails?.data?.guest?.name}</span>
          </IconWithText>
          <IconWithText>
            <PreFormattedIcon>
              <MdAlternateEmail />
            </PreFormattedIcon>
            <span>{requestDetails?.data?.guest?.email ?? t("noEmail")}</span>
          </IconWithText>
          <IconWithText>
            <PreFormattedIcon>
              <CiPhone />
            </PreFormattedIcon>
            <span>
              {requestDetails?.data?.guest?.phoneNumber ?? t("noPhoneNumber")}
            </span>
          </IconWithText>
          <IconWithText>
            <PreFormattedIcon>
              <CiLocationOn />
            </PreFormattedIcon>{" "}
            <span>{requestDetails?.data?.guest?.nationality?.name}</span>
          </IconWithText>
          <IconWithText>
            <PreFormattedIcon>
              <FaRegAddressCard />
            </PreFormattedIcon>{" "}
            <span>
              {requestDetails?.data?.guest?.identityType ?? t("noIdentity")}
            </span>
          </IconWithText>
          <IconWithText>
            <PreFormattedIcon>
              <FaRegAddressCard />
            </PreFormattedIcon>{" "}
            <span>
              {requestDetails?.data?.guest?.identityId ?? t("noIdentityId")}
            </span>
          </IconWithText>
        </div>
      </div>
      <div className="border border-solid border-slate-200 p-4 rounded-lg mb-4 grid grid-cols-4 gap-4">
        <IconWithText>
          <PreFormattedIcon>
            <FaCarAlt />
          </PreFormattedIcon>
          <span>{requestDetails?.data?.guest?.name}</span>
        </IconWithText>
        <IconWithText>
          <PreFormattedIcon>
            <MdNumbers />
          </PreFormattedIcon>
          <span>{requestDetails?.data?.guest?.email ?? t("noEmail")}</span>
        </IconWithText>
        <IconWithText>
          <PreFormattedIcon>
            <IoIosColorPalette />
          </PreFormattedIcon>{" "}
          <span>
            {requestDetails?.data?.guest?.phoneNumber ?? t("noPhoneNumber")}
          </span>
        </IconWithText>
      </div> */}
      <div className="flex flex-col gap-3">
        <InviteDetailsHeader
          invite={requestDetails?.data ?? {}}
          refetch={() => {}}
        />
      </div>
      <ComplexTable
        hasSearch={false}
        hasAdd={false}
        hasStatusFilter={false}
        tableTitle={t("guestHistory")}
        columns={[
          {
            title: t("visitDate"),
            dataIndex: "date",
          },
          {
            title: t("entryTime"),
            dataIndex: "entryTime",
          },
          {
            title: t("exitTime"),
            dataIndex: "exitTime",
          },
        ]}
      />
    </CustomCard>
  );
}

function PreFormattedIcon({ children }) {
  return cloneElement(children, { className: "text-gray-400 text-lg" });
}
