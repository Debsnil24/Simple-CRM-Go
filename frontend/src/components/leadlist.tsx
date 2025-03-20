import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../styles/leadlist.css";
import ModalDialog from "./ModalDialog";
import { useState } from "react";
const LeadList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <div>
      <Box className="lead-label-box">
        <div className="lead-label-container">
          <Typography variant="h6" className="lead-label">
            Leads
          </Typography>
        </div>
        <div className="create-lead-container">
          <Button
            variant="contained"
            className="create-lead-btn"
            startIcon={<AddCircleIcon />}
            onClick={() => handleOpenDialog()}
          >
            {" "}
            Create{" "}
          </Button>
        </div>
        <ModalDialog open={openDialog} onClose={handleCloseDialog} />
      </Box>
    </div>
  );
};

export default LeadList;
