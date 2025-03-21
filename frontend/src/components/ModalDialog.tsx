import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/ModalDialog.css";
interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (lead: {
    name: string;
    company: string;
    number: string;
    email: string;
  }) => void;
  initialData?: { name: string; company: string; number: string; email: string; }
}

const ModalDialog: React.FC<ModalDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    number: "",
    email: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: "", company: "", number: "", email: "" });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.company ||
      !formData.number ||
      !formData.email
    ) {
      alert("All fields are required!");
      return;
    }
    onSubmit(formData);
    setFormData({ name: "", company: "", number: "", email: "" });
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {initialData ? "Modify Lead" : "Create New Lead"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          autoCapitalize="on"
        />
        <TextField
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <PhoneInput
          country={"in"}
          value={formData.number}
          onChange={(value) => setFormData({ ...formData, number: value })}
          inputStyle={{ width: "100%", backgroundColor:"transparent", border: "1px solid rgba(0, 0, 0, 0.23)", color: "rgba(0, 0, 0, 0.87)",}}
          specialLabel=""
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {initialData ? "Update Lead":"Create Lead"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDialog;
