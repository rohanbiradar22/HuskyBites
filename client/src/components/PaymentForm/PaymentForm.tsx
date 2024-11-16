import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button } from "@mui/material";
import { CardDetails } from "@/models/order";

// Define props for PaymentForm
interface PaymentFormProps {
  onPlaceOrder: (data: CardDetails) => void;
  onBack: () => void;
}

// Define type for form errors
type FormErrors = {
  [K in keyof CardDetails]?: string;
};

// PaymentForm component
const PaymentForm: React.FC<PaymentFormProps> = ({ onPlaceOrder, onBack }) => {
  // State to manage form data
  const [formData, setFormData] = useState<CardDetails>({
    cardNumber: "",
    expiryDate: "",
    cardHolderName: "",
    cvv: "",
  });

  // State to manage form errors
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Handle form field changes
  const handleChange = (field: keyof CardDetails, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleBackClick = () => {
    // Call the onBack function when the "Back" button is clicked
    onBack();
  };

  // Handle "Place order" button click
  const handlePlaceOrderClick = () => {
    // Validate form fields
    const newFormErrors: FormErrors = {};
    let isValid = true;

    // Check if required fields are filled
    const requiredFields: Array<keyof CardDetails> = [
      "cardNumber",
      "expiryDate",
      "cardHolderName",
      "cvv",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newFormErrors[field] = "This field is required";
        isValid = false;
      }
    });

    // Update form errors or log the form data
    if (isValid) {
      onPlaceOrder(formData);
    } else {
      setFormErrors(newFormErrors);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardHolderName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={formData.cardHolderName}
            onChange={(e) => handleChange("cardHolderName", e.target.value)}
            error={!!formErrors.cardHolderName}
            helperText={formErrors.cardHolderName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={formData.cardNumber}
            onChange={(e) => handleChange("cardNumber", e.target.value)}
            error={!!formErrors.cardNumber}
            type="number" // Specify the input type as "number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expiryDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={formData.expiryDate}
            onChange={(e) => handleChange("expiryDate", e.target.value)}
            error={!!formErrors.expiryDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={formData.cvv}
            onChange={(e) => handleChange("cvv", e.target.value)}
            error={!!formErrors.cvv}
            type="number" // Specify the input type as "number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </Grid>
        <div className="action-btn-div">
          <Button onClick={handleBackClick} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handlePlaceOrderClick}
            sx={{ mt: 3, ml: 1 }}
          >
            Place order
          </Button>
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default PaymentForm;
