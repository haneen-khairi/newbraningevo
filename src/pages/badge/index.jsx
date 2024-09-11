import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchOneRequest } from "@/services/requests";
import { QRCode } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
export default function Badge() {
  const { id } = useParams();
  const [printedOnce, setPrintedOnce] = useState(false);
  const { data: request, isPending } = useQuery({
    queryKey: ["request", id],
    queryFn: () => fetchOneRequest(id),
    staleTime: 1000 * 60 * 1,
  });
  let requestData = request?.data ?? {};

  useEffect(() => {
    if (!isPending && requestData && !printedOnce) {
      setTimeout(() => {
        print();
        setPrintedOnce(true);
      }, 1000);
    }
  }, [isPending, requestData]);
  if (isPending) return <div>Loading...</div>;
  return (
    <body
      style={{
        width: "210mm",
        height: "297mm",
        position: "relative",
      }}
    >
      <div id="vertical-line"></div>
      <div id="horizontal-line"></div>
      <section id="header">
        <img
          style={{
            padding: "30px",
          }}
          src="data:image/png;base64,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"
        />
      </section>
      <section
        id="body"
        style={{
          minHeight: "400px",
        }}
      >
        <div
          id="right-side"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            textAlign: "center",
            justifyContent: "center",
            paddingTop: "105px",
            position: "relative",
          }}
        >
          <svg
            width="97"
            height="106"
            viewBox="0 0 97 106"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              top: "10px",
              left: "0",
              zIndex: "-1",
            }}
          >
            <path d="M0 -2H97L0 95V-2Z" fill="#38ACB1" />
            <path
              d="M49.7929 55.5238C51.563 53.7294 52.348 51.1393 51.8554 48.6428L49.9776 39L0 89.6635V106L49.7929 55.5238Z"
              fill="#38ACB1"
            />
            <path d="M92 -2H0V90L46.0078 44.0078L92 -2Z" fill="#0D0E17" />
          </svg>

          <div>
            <h3>{requestData?.guest?.name}</h3>
            <p>{requestData?.guest?.title ?? "-"}</p>
          </div>
          <div>
            <p class="secondary-text">Company Name</p>
            <p>{requestData?.party ?? "-"}</p>
          </div>
          <div id="qr-code-container">
            <QRCode value="https://www.google.com" size={100} />
            <h3
              style={{
                color: "#38acb1",
              }}
            >
              Visitor
            </h3>
          </div>
          <img
            style={{
              position: "absolute",
              bottom: "0",
              width: "99%",
              zIndex: "-1",
            }}
            src="data:image/png;base64,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"
          />
        </div>
        <div
          id="left-side"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "20px",
          }}
        >
          <div>
            <p class="secondary-text">Received an invitation From</p>
            <p>{requestData?.requester?.name}</p>
          </div>
          <div>
            <p class="secondary-text">Date and time</p>
            <p>{dayjs(requestData?.validFrom).format("YYYY-MM-DD @ HH:mm")}</p>
          </div>
          <div>
            <p class="secondary-text">Location</p>
            <p>
              {requestData?.room?.name} ({requestData?.room?.number ?? "-"})
            </p>
          </div>
        </div>
      </section>
      <section
        id="footer"
        style={{
          textAlign: "center",
          margin: "10px 20px",
          padding: "10px",
          borderRadius: "4px",
          backgroundColor: "#38acb1",
          minHeight: "32px",
        }}
      ></section>
      <div
        style={{
          margin: "10px 20px",
          borderRadius: "8px",
          padding: "15px",
          backgroundColor: "#f7fcfc",
        }}
      >
        Upon your arrival , Scan the below QR code at the the gates in the
        reception area. Our Concierge team wil be happy to guide you to your
        meeting point.
      </div>
      <div
        style={{
          margin: "10px 20px",
          borderRadius: "8px",
          padding: "15px",
          backgroundColor: "#f7fcfc",
        }}
      >
        <p class="secondary-text">WIFI</p>
        Our Guests WI-Fi Network is available , and the password will be Shared
        upon arrival
      </div>
      <img
        style={{
          position: "absolute",
          right: "0",
          bottom: "0",
        }}
        src="data:image/png;base64,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"
      />
      <div
        style={{
          position: "absolute",
          bottom: "0",
          backgroundColor: "#000",
          width: "100%",
          height: "20px",
          zIndex: "-1",
        }}
      ></div>
    </body>
  );
}
