import ApexChart from "react-apexcharts";
export default function InvitesChart({ data }) {
  return (
    <ApexChart
      type="bar"
      series={[
        {
          name: "Invites",
          data: data,
        },
      ]}
      options={{
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        plotOptions: {
          bar: {
            borderRadiusApplication: "end",
            columnWidth: "20%",
            dataLabels: {
              position: "top", // top, center, bottom
            },
            borderRadius: 10,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        yaxis: {
          opposite: true,
        },
        fill: {
          colors: ["#38ACB1"],
        },
        chart: {
          toolbar: {
            tools: {
              download: false,
            },
          },
        },
      }}
    ></ApexChart>
  );
}
