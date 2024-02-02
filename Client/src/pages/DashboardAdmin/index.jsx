import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography, useTheme } from "@mui/material";

const AdminDashboard = () => {
  const theme = useTheme();
  return (
    <Container component="main" maxWidth="xs">
      <Typography
        variant="h4"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        Panel de Administrador
      </Typography>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#c7ceea",
          color: theme.palette.common.white,
        }}
        fullWidth
        style={{ margin: "10px 0" }}
        component={Link}
        to="/team/addplayer"
      >
        Crear equipo
      </Button>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#b05f5f",
          color: theme.palette.common.white,
        }}
        fullWidth
        style={{ margin: "10px 0" }}
        component={Link}
        to="/team/list"
      >
        Lista de equipos
      </Button>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#a48e00",
          color: theme.palette.common.white,
        }}
        fullWidth
        style={{ margin: "10px 0" }}
        component={Link}
        to="/matchdaycreate"
      >
        Crear jornada
      </Button>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#415cbd",
          color: theme.palette.common.white,
        }}
        fullWidth
        style={{ margin: "10px 0" }}
        component={Link}
        to="/matchday"
      >
        Ver jornada
      </Button>
    </Container>
  );
};

export default AdminDashboard;
