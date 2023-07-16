import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartVideo = ({ video }) => {
  console.log(video);
  const data = {
    labels: ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          video ? video[0] : 0,
          video ? video[1] : 0,
          video ? video[2] : 0,
          video ? video[3] : 0,
          video ? video[4] : 0,
          video ? video[5] : 0,
          video ? video[6] : 0,
        ],
        backgroundColor: [
          "#FAF9F6",
          "#F8F2E9",
          "#FFB6A9",
          "#C6E5FF",
          "#FEFCC9",
          "#D6F4FF",
          "#C5FCD6",
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

export default PieChartVideo;
