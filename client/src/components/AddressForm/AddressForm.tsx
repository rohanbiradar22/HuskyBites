"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Button } from "@mui/material";
import Address from "@/models/address";

export interface FormData {
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Props for the AddressForm component
interface AddressFormProps {
  onNext: (data: Address) => void;
}

type FormErrors = {
  [K in keyof Address]?: string;
};

// AddressForm component
const AddressForm: React.FC<AddressFormProps> = ({ onNext }) => {
  const [formData, setFormData] = useState<Address>({
    // firstName: "",
    // lastName: "",
    addressLine: "",
    city: "",
    state: "",
    zipCode: 0,
    country: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof Address, value: string | number) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleNextClick = () => {
    // Array of required fields
    const requiredFields: Array<keyof Address> = [
      "addressLine",
      "city",
      "state",
      "zipCode",
      "country",
    ];

    // Object to store new form validation errors
    const newFormErrors: FormErrors = {};
    let isValid = true;

    // Check required fields
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newFormErrors[field] = "This field is required";
        isValid = false;
      }
    });

    if (isValid) {
      onNext(formData);
    } else {
      setFormErrors(newFormErrors);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Delivery address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={(e) => handleChange("addressLine", e.target.value)}
            error={!!formErrors.addressLine}
            helperText={formErrors.addressLine}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={(e) => handleChange("city", e.target.value)}
            error={!!formErrors.city}
            helperText={formErrors.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange("state", e.target.value)}
            error={!!formErrors.state}
            helperText={formErrors.state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zipCode"
            name="zipCode"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            type="number" // Specify the input type as "number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={(e) => handleChange("zipCode", e.target.value)}
            error={!!formErrors.zipCode}
            helperText={formErrors.zipCode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={(e) => handleChange("country", e.target.value)}
            error={!!formErrors.country}
            helperText={formErrors.country}
          />
        </Grid>
        <div className="action-btn-div">
          <Button
            variant="contained"
            onClick={handleNextClick}
            sx={{ mt: 3, ml: 1 }}
          >
            Next
          </Button>
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default AddressForm;
