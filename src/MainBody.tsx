import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { startOfYear, endOfYear, eachDayOfInterval, format, addYears, subDays } from "date-fns";
import { useState } from "react";
import ReactTooltip from "react-tooltip";
import "./MainBody.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface DatesWithColour {
  date: Date;
  colour: "red" | "filled";
}
export default function MainBody(): JSX.Element {
  const currentDate = new Date();
  const startDate = subDays(startOfYear(addYears(currentDate, 1)), 1);
  const endDate = endOfYear(addYears(currentDate, 1));
  const dates = eachDayOfInterval({ start: startDate, end: endDate });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const datesWithColour: DatesWithColour[] = dates.map((date) => {
    return {
      date: date,
      colour: "red",
    };
  });
  const [datesToUse, setDatesToUse] =
    useState<DatesWithColour[]>(datesWithColour);
  const handleLogButton = () => {
    const newDateswithColours: DatesWithColour[] = datesToUse.map((object) => {
      if (object.date.getTime() === selectedDate.getTime()) {
        return { ...object, colour: "filled" };
      }
      return object;
    });
    setDatesToUse(newDateswithColours);
  };

  return (
    <>
      <>
        <div className="calendarMap">
          <CalendarHeatmap
            gutterSize={3}
            showWeekdayLabels={true}
            startDate={startDate}
            endDate={endDate}
            values={datesToUse}
            classForValue={(value) => {
              if (!value) {
                return "color-empty";
              }
              if (value.colour === "red") {
                return "colour-red";
              }
              if (value.colour === "filled") {
                return "colour-filled";
              }
              return "color-white";
            }}
            tooltipDataAttrs={(value: any) => {
              let formattedDate: string | undefined;
          if (value.date) {
            formattedDate = format(value.date, "MMM dd, yyyy");
          }
              return {
                "data-tip": `${formattedDate}`,
              };
            }}
          />
        </div>
        <Calendar value={selectedDate} onChange={setSelectedDate} />
        <p>
          <b>Date Selected is:</b>{" "}
        </p>
        {format(selectedDate, "MMM dd, yyyy")}
      </>
      <hr />
      <button className="log-button" onClick={handleLogButton}>
        Log Date
      </button>
      <ReactTooltip />
    </>
  );
}
