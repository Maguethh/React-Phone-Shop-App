import React, { useState, useEffect } from "react";
import axios from "axios";
import PhoneCard from "./PhoneCard";
import CreatePhoneCard from "./CreatePhoneCard"; // Assurez-vous d'avoir ce composant
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

const socket = io("http://localhost:4000");

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

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:4000/phone/delete/${id}`)
      .then(() => {
        setPhones(phones.filter((phone) => phone._id !== id));
        socket.emit("deletePhone", id);
      })
      .catch((err) => console.error(err));
  };

  const handleUpdate = (updatedPhone: Phone) => {
    axios
      .put(
        `http://localhost:4000/phone/update/${updatedPhone._id}`,
        updatedPhone
      )
      .then(() => {
        setPhones(
          phones.map((phone) =>
            phone._id === updatedPhone._id ? updatedPhone : phone
          )
        );
        socket.emit("updatePhone", updatedPhone);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Grid container spacing={2} style={{ padding: 24 }}>
      {phones.map((phone) => (
        <Grid item key={phone._id}>
          <PhoneCard
            phone={phone}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </Grid>
      ))}
      <Grid item>
        <CreatePhoneCard
          onCreate={(newPhone) => {
            // Logique pour ajouter un nouveau téléphone à la liste
            // Peut-être émettre un événement socket ou appeler une API, puis mettre à jour l'état local
          }}
        />
      </Grid>
    </Grid>
  );
};

export default PhoneList;
