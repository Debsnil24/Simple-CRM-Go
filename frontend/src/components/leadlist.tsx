import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../styles/leadlist.css";
import ModalDialog from "./ModalDialog";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLead, deleteLead, getAll, modifyLead } from "../routes";
import LeadListItem from "./LeadListItem";

interface Lead {
  id: string;
  name: string;
  company: string;
  number: string;
  email: string;
}

const LeadList = () => {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [leadList, setleadList] = useState<Lead[]>([]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["leads"],
    queryFn: getAll,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteLead(id);
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newLead: {
      name: string;
      company: string;
      number: string;
      email: string;
    }) => {
      await createLead(
        newLead.name,
        newLead.company,
        newLead.number,
        newLead.email
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (error) => {
      console.log("Failed", error);
      alert("Failed to Create Lead");
    },
  });
    
  const modifyMutation = useMutation({
    mutationFn: async (updatedLead: {
      id: string;
      name: string;
      company: string;
      number: string;
      email: string;
    }) => {
      await modifyLead(
        updatedLead.id, 
        updatedLead.name, 
        updatedLead.company, 
        updatedLead.number, 
        updatedLead.email
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] }); // Refresh data after modification
    },
    onError: (error) => {
      console.log("Failed to modify lead", error);
      alert("Failed to Modify Lead");
    },
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

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };
    
  const handleModifyLead = (updatedLead: {
    id: string;
    name: string;
    company: string;
    number: string;
    email: string;
  }) => {
    modifyMutation.mutate(updatedLead);
  };

  const handleCreateLead = (newLead: {
    name: string;
    company: string;
    number: string;
    email: string;
  }) => {
    createMutation.mutate(newLead);
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
        <ModalDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onSubmit={handleCreateLead}
        />
      </Box>
      <div className="lead-list">
        {leadList.length === 0 ? (
          <p className="no-lead">No Leads available</p>
        ) : (
          leadList.map((lead) => (
            <LeadListItem
              key={lead.id}
              leaditem={lead}
                  handleDelete={handleDelete}
                  handleModify={handleModifyLead}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LeadList;
