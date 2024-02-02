import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

function Brand() {
  return (
    <>
      <SportsSoccerIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component={NavLink}
        sx={{
          mr: 2,

          display: { xs: "none", md: "flex" },
          fontFamily: "Roboto",
          fontWeight: 700,
          letterSpacing: ".1rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Futbotiesos
      </Typography>
    </>
  );
}
export default Brand;
