import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../styles/leadlist.css";
import ModalDialog from "./ModalDialog";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../routes";
import LeadListItem from "./LeadListItem";

interface Lead {
  id: string;
  name: string;
  company: string;
  number: string;
  email: string;
}

const LeadList = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [leadList, setleadList] = useState<Lead[]>([]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["leads"],
    queryFn: getAll,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  
  useEffect(() => {
    if (Array.isArray(data)) {
      setleadList(data);
    }
  }, [data]);
    
  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error fetching data!</div>;

  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <div className="main-container">
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
            Create
          </Button>
        </div>
        <ModalDialog open={openDialog} onClose={handleCloseDialog} />
      </Box>
      <div className="lead-list">
        {leadList.length === 0 ? (
          <p className="no-lead">No Leads available</p>
        ) : (
          leadList.map((lead) => <LeadListItem key={lead.id} leaditem={lead} />)
        )}
      </div>
    </div>
  );
};

export default LeadList;
