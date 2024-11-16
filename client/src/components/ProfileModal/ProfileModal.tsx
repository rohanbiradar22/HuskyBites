import React, { useState } from "react";
import axiosInstance from "@/services/axios-service";
import { useAppSelector } from "@/redux/store";
import { toast } from "react-toastify";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Backdrop } from "@mui/material";

type ProfileModalProps = {
  open: boolean;
  onClose: () => null;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose }) => {
  const [file, setFile] = useState<File>();

  const [loading, setLoading] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const formHandler = async () => {
    // e.preventDefault();

    setLoading(true);

    if (!file) return;

    try {
      const reader = new FileReader();

      reader.onload = async function (e) {
        const base64String = e?.target?.result;

        try {
          if (user?.role === "RESTAURANT") {
            let response = await axiosInstance.put(`/restaurant/${user?._id}`, {
              profilePhoto: base64String,
            });
          }

          toast.success("Image uploaded succesfully", {
            autoClose: 900,
          });
          setLoading(false);
          onClose();
        } catch (err) {
          console.log("error", err);
          toast.error("Failed to upload image", {
            autoClose: 500,
          });
          setLoading(false);
          onClose();
        }
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.log("Failed to upload profile photo ", err);
      toast.error("Failed to upload image", {
        autoClose: 500,
      });
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Set Profile Photo</DialogTitle>
        <DialogContent>
          <form className="modal_form" onSubmit={formHandler}>
            <input type="file" name="file" onChange={(e) => setFile(e.target.files?.[0])} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="button" onClick={formHandler}>
            Save
          </Button>
        </DialogActions>
        {loading && (
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Dialog>
    </>
  );
};

export default ProfileModal;
