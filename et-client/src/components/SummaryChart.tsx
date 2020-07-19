import React from "react";

import { VictoryPie } from "victory";
import { Summary } from "../Types";

interface Props extends Summary {}

const SummaryChart: React.FC<Props> = ({
  income,
  saving,
  balance,
  expense,
}) => {
  const data = [
    { x: "Balance", y: balance },
    { x: "Saving", y: saving },
    { x: "Expense", y: expense },
  ];

  const colors = ["#35a744", "#307bff", "#dc3644"];
  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="my-1 text-center text-dark">
        <strong>Income: Rs.{income}</strong>
      </div>
      <VictoryPie
        width={400}
        data={data}
        colorScale={colors}
        innerRadius={100}
        labelPlacement="perpendicular"
        labels={({ datum }) =>
          datum.x +
          " " +
          ((datum.y / (income === 0 ? 1 : income)) * 100).toFixed(2) +
          " %"
        }
        padAngle={({ datum }) => 4}
      />
    </div>
  );
};

export default SummaryChart;
