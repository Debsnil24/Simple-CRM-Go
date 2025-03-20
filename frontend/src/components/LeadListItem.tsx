import { Box, IconButton } from "@mui/material";
import "../styles/LeadListitem.css";
import { WhatsApp, Email, Edit, Delete } from "@mui/icons-material";

interface LeadItem {
  id: string;
  name: string;
  company: string;
  number: string;
  email: string;
}

interface LeadListItemProps {
  leaditem: LeadItem;
}

const LeadListItem: React.FC<LeadListItemProps> = ({ leaditem }) => {
  return (
    <Box className="lead-list-container">
      <div className="lead-item">
        <span className="lead-name">{leaditem.name}</span>
        <span className="lead-company">{leaditem.company}</span>
        <div className="lead-action">
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
              window.open(`mailto:${leaditem.email}`, "_blank");
            }}
          >
            <Email />
          </IconButton>
          <IconButton color="info">
            <Edit />
          </IconButton>
          <IconButton color="error">
            <Delete />
          </IconButton>
        </div>
      </div>
    </Box>
  );
};

export default LeadListItem;
