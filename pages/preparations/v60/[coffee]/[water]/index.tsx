import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faStar } from "@fortawesome/free-solid-svg-icons";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/services/Firebase";
const inter = Inter({ subsets: ["latin"] });

export default function V60() {
  const [u, setU] = useState(false);
  let rati = 0;

  const router = useRouter();
  const coffee = router.query.coffee;
  const water = router.query.water;

  const handleSave = async () => {
    const docRef = await addDoc(collection(db, "coffee"), {
      rating: Number(rati),
      coffee: Number(coffee),
      water: Number(water),
      caffeine: Math.ceil((145 * (water / (250)) * (coffee / 15))),
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
    router.push("/history")
  };

  const handleRating = (rating) => {
    setU(true);

    rati = rating;
  };

  return (
    <main
      className={
        "bg-primary h-screen w-screen flex justify-center items-center flex-col"
      }
    >
      <div className="text-3xl">Resumen</div>
      <div className="text-xl">Café: {coffee}g</div>
      <div className="text-xl mb-2">Agua: {water}ml</div>
      <div className="text-xl mb-8">Cafeína aproximada: {Math.ceil((145 * (water / (250)) * (coffee / 15)))}mg</div>
      <div className="text-3xl mb-2">Calificación</div>
      <div className="w-full mb-4 flex justify-center">
        <Rating
          emptySymbol={
            <FontAwesomeIcon
              icon={faStar}
              className="text-gray-400 w-10 h-10"
            />
          }
          fullSymbol={
            <FontAwesomeIcon
              icon={faStar}
              className="w-10 h-10 text-orange-600"
            />
          }
          fractions={2}
          onChange={(value) => handleRating(value)}
        />
      </div>
      <Button isDisabled={!u} onClick={() => handleSave()}>
        Guardar
      </Button>
    </main>
  );
}
