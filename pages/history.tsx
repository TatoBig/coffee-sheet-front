import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/services/Firebase";
import { useRouter } from "next/router";

const History = () => {
  const [docs, setDocs] = useState<any>([]);

  const router = useRouter()

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(docs);
  }, [docs]);

  const fetchData = async () => {
    const q = query(collection(db, "coffee"));
    const arr: any = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });
    setDocs(arr);
  };

  return (
    <div className="bg-primary flex justify-start flex-col">
      <Button onClick={() => router.push('/cafeine')}className="mb-32">Visualizar cafeina</Button>
      <TableContainer className="w-full">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th isNumeric>No. </Th>
              <Th isNumeric>Cafe (g)</Th>
              <Th isNumeric>Agua (ml)</Th>
              <Th isNumeric>Cafeína (mg)</Th>
              <Th isNumeric>Nota</Th>
            </Tr>
          </Thead>
          <Tbody>
            {docs.map((doc, index) => (
              <Tr key={index}>
                <Td isNumeric>{index + 1}</Td>
                <Td isNumeric>{doc.coffee}</Td>
                <Td isNumeric>{doc.water}</Td>
                <Td isNumeric>{doc.caffeine}</Td>
                <Td isNumeric>{doc.rating}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default History;
