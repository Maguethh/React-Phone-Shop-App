import React, { useState, useEffect } from "react";
import axios from "axios";
import PhoneCard from "./PhoneCard";
import { Grid } from "@mui/material";
import io from "socket.io-client";

interface Phone {
  _id: number;
  name: string;
  type: string;
  price: number;
  rating: number;
  warranty_years: number;
  available: boolean;
}

const socket = io("http://localhost:4000"); // changer l'adresse en localhost:port backend si besoin

const PhoneList = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("requestPhones");
    });

    socket.on("updatePhones", (updatedPhones) => {
      console.log("Phones received:", updatedPhones);
      setPhones(updatedPhones);
    });

    return () => {
      socket.off("connect");
      socket.off("updatePhones");
    };
  }, []);

  return (
    <Grid container spacing={2} style={{ padding: 24 }}>
      {phones.map((phone) => (
        <Grid item key={phone._id}>
          <PhoneCard phone={phone} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PhoneList;
