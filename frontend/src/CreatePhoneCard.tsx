import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Rating from "@mui/material/Rating";

interface Phone {
  _id?: number;
  name: string;
  type: string;
  price: number;
  rating: number;
  warranty_years: number;
  available: boolean;
}

interface CreatePhoneCardProps {
  onCreate: (phone: Phone) => void;
}

const CreatePhoneCard: React.FC<CreatePhoneCardProps> = ({ onCreate }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [newPhone, setNewPhone] = useState<Phone>({
    name: "",
    type: "",
    price: 0,
    rating: 0,
    warranty_years: 0,
    available: false,
  });

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewPhone({
      ...newPhone,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCreate = () => {
    axios
      .post("http://localhost:4000/phone/create", newPhone)
      .then((response) => {
        onCreate(response.data);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("There was an error creating the phone:", error);
      });
  };

  return (
    <>
      <Card
        style={{
          margin: 10,
          width: 300,
          height: 206,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleOpenModal}>
          <AddIcon style={{ fontSize: "5rem" }} />
        </IconButton>
      </Card>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Create New Phone</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={newPhone.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="type"
            label="Type"
            type="text"
            fullWidth
            variant="standard"
            value={newPhone.type}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={newPhone.price}
            onChange={handleChange}
          />
          <Rating
            name="rating"
            value={newPhone.rating}
            onChange={(event, newValue) => {
              setNewPhone({ ...newPhone, rating: newValue || 0 });
            }}
            precision={0.5}
            max={5}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newPhone.available}
                onChange={(e) =>
                  setNewPhone({ ...newPhone, available: e.target.checked })
                }
                name="available"
              />
            }
            label="Available"
          />
          <TextField
            margin="dense"
            name="warranty_years"
            label="Warranty Years"
            type="number"
            fullWidth
            variant="standard"
            value={newPhone.warranty_years}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreatePhoneCard;
