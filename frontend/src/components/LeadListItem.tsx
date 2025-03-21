import { Alert, Box, IconButton, Snackbar } from "@mui/material";
import "../styles/LeadListitem.css";
import { WhatsApp, Email, Edit, Delete } from "@mui/icons-material";
import { useState } from "react";
import ModalDialog from "./ModalDialog";

interface LeadItem {
  id: string;
  name: string;
  company: string;
  number: string;
  email: string;
}

interface LeadListItemProps {
  leaditem: LeadItem;
  handleDelete: (id: string) => void;
  handleModify: (lead: LeadItem) => void;
}

const LeadListItem: React.FC<LeadListItemProps> = ({
  leaditem,
  handleDelete,
  handleModify,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleOpenDialog = (lead: LeadItem) => {
    setSelectedLead(lead);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box className="lead-list-container">
      <div className="lead-item">
        <span className="lead-name">{leaditem.name}</span>
        <span className="lead-company">{leaditem.company}</span>
        <div className="lead-action">
          <ModalDialog
            open={openDialog}
            onClose={handleCloseDialog}
            onSubmit={(updatedLead) => {
              handleModify({
                id: leaditem.id,
                name: updatedLead.name,
                company: updatedLead.company,
                number: updatedLead.number,
                email: updatedLead.email,
              });
            }}
            initialData={selectedLead || undefined}
          />
          <IconButton
            color="success"
            onClick={() => {
              const formattedNumber = leaditem.number.replace(/\D/g, "");
              window.open(`https://wa.me/${formattedNumber}`, "_blank");
            }}
          >
            <WhatsApp />
          </IconButton>
          <IconButton
            onClick={() => {
              navigator.clipboard
                .writeText(leaditem.email)
                .then(() => {
                  setAlertOpen(true);
                })
                .catch((err) => console.error("Failed to copy email", err));
            }}
          >
            <Email />
          </IconButton>
          <IconButton color="info" onClick={() => handleOpenDialog(leaditem)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(leaditem.id)}>
            <Delete />
          </IconButton>
        </div>
      </div>
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity="success"
          variant="filled"
        >
          Email ID was successfully copied!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LeadListItem;
