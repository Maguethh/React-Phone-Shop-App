import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

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
}

const PhoneCard: React.FC<PhoneCardProps> = ({ phone }) => {
  return (
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
      </CardActions>
    </Card>
  );
};

export default PhoneCard;
