import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function V60() {
  const [current, setCurrent] = useState(0);
  const [reference, setReference] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [counter, setCounter] = useState(0);
  const [water, setWater] = useState(0);
  const [coffee, setCoffee] = useState(0);
  const [option, setOption] = useState<any>(false);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      getWeight();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(counter / 3600);
  const minutes = Math.floor((counter % 360000) / 60);
  const seconds = Math.floor(counter % 6000);

  useEffect(() => {
    let intervalId: any;
    if (startTimer) {
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
      <div className="absolute top-8 flex flex-col justify-center items-center">
        <h1 className="text-xl mb-4">Medición</h1>
        <div className="flex mb-4">
          <Button
            onClick={() => {
              setOption("café");
            }}
            isDisabled={option === "agua" || current !== 0}
          >
            Cafe
          </Button>
          <Button
            onClick={() => {
              setOption("agua");
            }}
            isDisabled={option === "café" || current !== 0}
          >
            Agua
          </Button>
        </div>
        <div>
          <Button
            isDisabled={option === false}
            onClick={() => {
              if (option === "café") {
                setCoffee(current - reference);
              } else {
                setWater(current - reference);
              }
            }}
          >
            Aceptar medida
          </Button>
          <Button
            isDisabled={coffee === 0 || water === 0}
            onClick={() => router.push(`/preparations/v60/finish/${coffee}/${water}`)}
          >
            Finalizar
          </Button>
        </div>

        <div className="text-xl flex flex-col items-center mt-4">
          <span>
            Resumen <br />
          </span>
          <span className="text-lg">
            Café: {coffee} g
            <br />
          </span>
          <span className="text-lg">Agua: {water} ml</span>
        </div>
      </div>
      <motion.div
        animate={{
          padding: 0.05 * (current - reference),
        }}
        className="bg-secondary rounded-full mt-20"
      >
        <div className="flex flex-col justify-center items-center p-8 ">
          <h1 className="text-xl">Peso actual</h1>
          <h1 className="text-4xl">{current - reference}</h1>
          <h1 className="text-xl">{option === "agua" ? "ml" : "gramos"} </h1>
          {option && <h1 className="text-xl">de {option}</h1>}
        </div>
      </motion.div>
      <Button
        position="absolute"
        bottom={20}
        onClick={() => {
          setReference(current);
          setOption(false);
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
    </main>
  );
}
