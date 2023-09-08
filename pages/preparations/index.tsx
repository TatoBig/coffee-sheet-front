import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const router = useRouter()

  return (
    <main
      className={
        "bg-primary h-screen w-screen flex justify-center items-center flex-col"
      }
    >
      <div className="flex flex-col justify-center items-center p-8">
        <Button
          mb={4}
          onClick={() => {
            router.push('/preparations/v60')
          }}
        >
          V60
        </Button>
        <Button
          mb={4}
          onClick={() => {
            router.push('/preparations/aeropress')
          }}
        >
          AeroPress
        </Button>
        <Button
          mb={4}
          onClick={() => {
            router.push('/preparations/mokapot')
          }}
        >
          Moka pot
        </Button>
      </div>
    </main>
  );
}
