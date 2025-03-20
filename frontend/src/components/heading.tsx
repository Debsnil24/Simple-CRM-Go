import { Box } from "@mui/material";
import "../styles/heading.css";
import MUISwitch from "./MUISwitch"

const Heading = () => {
  return (
    <div>
          <Box className="heading-box">
              <div></div>
              <div className="heading-label">Simple CRM</div>
              <div className="theme-switch">
                  <MUISwitch/>
              </div>
      </Box>
    </div>
  );
};

export default Heading;
