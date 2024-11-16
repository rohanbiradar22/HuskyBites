import React, { useState, useEffect, useRef } from "react";
import { Modal, TextField, Button, Typography } from "@mui/material";
import "./restaurant-menu.scss";
import FoodItem from "@/models/foodItem";

interface FoodItemModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  formData: FoodItem;
  onInputChange: (field: string, value: string | number | File | null) => void;
  onSubmit: () => void;
}

const FoodItemModal: React.FC<FoodItemModalProps> = ({
  open,
  onClose,
  title,
  formData,
  onInputChange,
  onSubmit,
}) => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [selectedImage, setSelectedImage] = useState<File | null | string>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      // If in edit mode and formData has an image, set the selected image
      if (formData.image) {
        setSelectedImage(formData.image);
        onInputChange("name", formData.name);
        onInputChange("foodImage", formData.foodImage);
        onInputChange("price", formData.price);
      }
    } else {
      setSelectedImage(null);
      onInputChange("name", "");
      onInputChange("foodImage", "");
      onInputChange("price", 0);
    }
  }, [open, formData.image]);

  const handleInputChange = (
    field: string,
    value: string | number | File | null
  ) => {
    if (field === "foodImage") {
      setSelectedImage(value as File);

      // Map the file to the base64 representation and update the formData
      if (value instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onInputChange("foodImage", value.name);
          onInputChange("image", reader.result as string); // Update the image field with base64 representation
        };
        reader.readAsDataURL(value);
      }
    } else {
      onInputChange(field, value);
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleInputChange("foodImage", file);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Food Item Name is required";
    }

    if (!selectedImage && !formData.foodImage) {
      errors.foodImage = "Food Image is required";
    }

    if (
      formData.price === undefined ||
      isNaN(formData.price) ||
      formData.price <= 0
    ) {
      errors.price = "Food Item Price must be a positive number";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-content">
        <div className="modal-header">
          <Typography variant="h4">{title}</Typography>
        </div>
        <div className="modal-body">
          <div className="left-side">
            <div className="image-preview" onClick={handleImageUpload}>
              {selectedImage ? (
                selectedImage instanceof File ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Food Item Preview"
                    className="preview-image"
                  />
                ) : (
                  <img
                    src={selectedImage}
                    alt="Food Item Preview"
                    className="preview-image"
                  />
                )
              ) : (
                <div className="upload-box">
                  <Typography variant="subtitle2">
                    Upload Menu Item Image
                  </Typography>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Button
              className="upload-btn"
              variant="outlined"
              onClick={handleImageUpload}
            >
              Upload Image
            </Button>
          </div>
          <div className="right-side">
            <div className="field-div">
              <TextField
                className="w-80"
                label="Food Item Name"
                value={formData.name}
                error={!!validationErrors.name}
                helperText={validationErrors.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="field-div">
              <TextField
                className="w-80"
                label="Food Item Price"
                type="number"
                value={
                  formData.price === undefined ? "" : String(formData.price)
                }
                error={!!validationErrors.price}
                helperText={validationErrors.price}
                onChange={(e) =>
                  handleInputChange(
                    "price",
                    e.target.value !== "" ? parseFloat(e.target.value) : 0
                  )
                }
              />
            </div>
            <div className="action-btns-div">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {title === "Add Food Item" ? "Save" : "Update"}
              </Button>
              <Button
                className="cancel-btn"
                variant="contained"
                color="primary"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FoodItemModal;
