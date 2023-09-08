import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/services/Firebase";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const subtractMinutes = (date, minutes) => new Date(date - minutes * 60000);
const getPastMinutes = (minutes: number, startDate = new Date()) => {
  return [...Array(minutes)].map((i, idx) => {
    let newDate = subtractMinutes(startDate, idx);
    let hour = newDate.getHours().toString().padStart(2, "0");
    let minute = newDate.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  });
};

function diff_minutes(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}

const labels = getPastMinutes(30).reverse();

const History = () => {
  const [docs, setDocs] = useState<any>([]);
  const [datax, setData] = useState<any>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(datax);
  }, [datax]);

  const fetchData = async () => {
    const q = query(collection(db, "coffee"));
    const arr: any = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });
    console.log(arr);
    arr.forEach((doc) => {
      if (diff_minutes(new Date(), doc.createdAt.toDate()) <= 30) {
        console.log(diff_minutes(new Date(), doc.createdAt.toDate()));
        const minutes = getPastMinutes(
          diff_minutes(new Date(), doc.createdAt.toDate())
        ).reverse();
        console.log(minutes);
        let found = false;
        let currentCaffeine = 0;
        setData(
          labels.map((label, index) => {
            console.log(label, minutes[0]);
            if (label === minutes[0]) {
              found = true;
              currentCaffeine = doc.caffeine;
              return doc.caffeine;
            } else if (found) {
              currentCaffeine =
                currentCaffeine - Math.floor(currentCaffeine * 0.11);
              return Math.floor(currentCaffeine);
            } else {
              return 0;
            }
          })
        );
      }
    });
    setDocs(arr);
  };

  const data = {
    datasets: [],
  };

  return (
    <div className="bg-primary flex justify-start flex-col">
      <Line
        options={options}
        data={{
          labels: labels?.slice(0, 30),
          datasets: [
            {
              label: "mg de cafeina",
              data: datax.slice(0, 30),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        }}
      />
    </div>
  );
};

export default History;
