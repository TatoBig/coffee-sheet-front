import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [reference, setReference] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [counter, setCounter] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      getWeight();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(counter / 3600);

  // Minutes calculation
  const minutes = Math.floor((counter % 360000) / 60);

  // Seconds calculation
  const seconds = Math.floor((counter % 6000) );

  // Milliseconds calculation
  useEffect(() => {
    let intervalId: any;
    if (startTimer) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setCounter(counter + 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [startTimer, counter]);

  const getWeight = async () => {
    const res = await axios.get("http://192.168.1.8:4000");
    setCurrent(res.data);
  };

  return (
    <main
      className={
        "bg-primary h-screen w-screen flex justify-center items-center flex-col"
      }
    >
      <motion.div
        animate={{
          padding: 0.05 * (current - reference),
        }}
        className="bg-secondary rounded-full"
      >
        <div className="flex flex-col justify-center items-center p-8">
          <h1 className="text-xl">Peso actual</h1>
          <h1 className="text-4xl">{current - reference}</h1>
          <h1 className="text-xl">gramos</h1>
        </div>
      </motion.div>
      <Button
        position="absolute"
        bottom={20}
        onClick={() => {
          setReference(current);
        }}
      >
        Calibrar
      </Button>
      <div className="absolute bottom-36">
        <p className="text-xl">
          0{hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </p>
      </div>
      <div className="absolute bottom-8 flex">
        <Button
          onClick={() => {
            setStartTimer(!startTimer);
          }}
        >
          {startTimer ? "Detener" : "Iniciar"}
        </Button>
        <Button
          onClick={() => {
            setCounter(0);
          }}
          isDisabled={startTimer === true}
        >
          Reiniciar
        </Button>
      </div>
      <Button
        position="absolute"
        top={20}
        onClick={() => {
          router.push("/preparations");
        }}
      >
        Preparar
      </Button>
      <Button
        position="absolute"
        top={30}
        onClick={() => {
          router.push("/history");
        }}
      >
        Historial
      </Button>
    </main>
  );
}
