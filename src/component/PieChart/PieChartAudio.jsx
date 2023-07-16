import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartAudio = ({ audio }) => {
  const data = {
    labels: ["Negative", "Positive", "Neutral"],
    datasets: [
      {
        label: "# of Votes",
        data: [audio?.neg, audio?.pos, audio?.neu],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
      },
    ],
  };

  return (
    <div>
      <Pie data={data} />
    </div>
  );
};

export default PieChartAudio;
