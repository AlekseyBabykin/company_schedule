import React from "react";
import { Container } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const MeetingStatisticsPage = () => {
  // Пример данных для графиков
  const dataPerDay = {
    labels: [
      "2024-03-01",
      "2024-03-02",
      "2024-03-03",
      "2024-03-04",
      "2024-03-05",
    ],
    datasets: [
      {
        label: "Number of Meetings per Day",
        data: [5, 3, 6, 4, 7],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const dataPerMonth = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Number of Meetings per Month",
        data: [20, 30, 45, 25, 40],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const dataPercentage = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Percentage of Meetings per Day",
        data: [20, 30, 15, 25, 10],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container className="mt-5">
      <h1>Meeting Statistics Page</h1>
      <h2>Number of Meetings per Day</h2>
      <Bar data={dataPerDay} />
      <h2>Number of Meetings for the Existing Month</h2>
      <Bar data={dataPerMonth} />
      <h2>Percentage of the Number of Meetings per Day</h2>
      <Bar data={dataPercentage} />
    </Container>
  );
};

export default MeetingStatisticsPage;
