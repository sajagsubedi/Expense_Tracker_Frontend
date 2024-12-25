import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

import { GET_CATEGORY_STATISTICS } from "../graphql/index.jsx";
import { useQuery } from "@apollo/client";

const ExpenseChart = ({ expenseData }) => {
  const { loading: categoryLoading, data: categoryStatistics } = useQuery(
    GET_CATEGORY_STATISTICS
  );
  if (categoryLoading) return null;
  const labels = categoryStatistics.categoryStatistics.map(
    (val) => val.category.slice(0,1).toUpperCase()+val.category.slice(1)
  );
  const dataValue = categoryStatistics.categoryStatistics.map(
    (val) => val.amount
  );
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "%",
        data: dataValue,
        backgroundColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 160,
      },
    ],
  };
  return (
    <div className="w-[85vw] flex justify-center md:w-1/2 h-auto">
      <Doughnut data={chartData} />
    </div>
  );
};

export default ExpenseChart;
