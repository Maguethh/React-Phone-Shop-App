import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  DialogContentText,
  FormControlLabel,
  Switch,
} from "@mui/material";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Cookies from "js-cookie";

interface Phone {
  _id: number;
  name: string;
  type: string;
  price: number;
  rating: number;
  warranty_years: number;
  available: boolean;
}

interface PhoneCardProps {
  phone: Phone;
  onDelete: (id: number) => void;
  onUpdate: (phone: Phone) => void;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ phone, onDelete, onUpdate }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editedPhone, setEditedPhone] = useState<Phone>(phone);

  const handleOpenEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:4000/phone/delete/${phone._id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .catch((error) => console.error("There was an error!", error));
    handleCloseDeleteDialog();
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:4000/phone/update/${phone._id}`, editedPhone, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })

      .catch((error) => console.error("There was an error!", error));
    handleCloseEditModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setEditedPhone({ ...editedPhone, [name]: newValue });
  };

  return (
    <>
      <Card style={{ margin: 10, width: 300 }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {phone.name}
          </Typography>
          <Typography color="textSecondary">
            Price: ${phone.price.toFixed(2)}
          </Typography>
          <Typography color="textSecondary">Rating: {phone.rating}</Typography>
          <Typography color="textSecondary">
            Warranty: {phone.warranty_years} year(s)
          </Typography>
          <Typography color="textSecondary">
            Available: {phone.available ? "Yes" : "No"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
          {Cookies.get("token") && (
            <>
              <Button size="small" onClick={handleOpenEditModal}>
                Modify
              </Button>
              <Button size="small" onClick={handleOpenDeleteDialog}>
                Delete
              </Button>
            </>
          )}
        </CardActions>
      </Card>

      <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Phone</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={editedPhone.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={editedPhone.price}
            onChange={handleChange}
          />
          <Rating
            name="rating"
            value={editedPhone.rating}
            onChange={(event, newValue) => {
              setEditedPhone({ ...editedPhone, rating: newValue || 0 });
            }}
            precision={0.5}
            max={5}
          />
          <FormControlLabel
            control={
              <Switch
                checked={editedPhone.available}
                onChange={(e) =>
                  setEditedPhone({
                    ...editedPhone,
                    available: e.target.checked,
                  })
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
            value={editedPhone.warranty_years}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently delete the phone. Are you sure you want to
            proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PhoneCard;
