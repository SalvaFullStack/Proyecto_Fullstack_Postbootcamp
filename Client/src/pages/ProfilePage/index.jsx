import React, { useState, useEffect } from "react";
import apiClient from "src/services/api-client";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CleaningServices } from "@mui/icons-material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)({
  marginTop: "2rem",
});

const StyledPaper = styled(Paper)({
  padding: "1rem",
  textAlign: "center",
  color: "inherit", // Use "inherit" to match the text color to the theme
});

const StyledButton = styled(Button)({
  marginTop: "1rem",
  width: "100%", // Ancho del 100% del contenedor padre
});

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    apiClient
      .get(`/users/profile`)
      .then(({ data }) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        setLoading(false); // Manejar el error y marcar la carga como completa
      });
  }, []);

  // Muestra un mensaje de carga mientras se obtiene la información del usuario
  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <StyledContainer>
      <Grid container spacing={2}>
        {/* Equipo */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6">Equipo:</Typography>
            <Typography variant="subtitle1">
              {userData.team ? userData.team.name : "No asignado"}
            </Typography>
          </StyledPaper>
        </Grid>
        {/* Posición */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6">Posición:</Typography>
            <Typography variant="subtitle1">{userData.position}</Typography>
          </StyledPaper>
        </Grid>
        {/* Botón Jornadas */}
        <Grid item xs={12}>
          <StyledButton
            variant="contained"
            sx={{
              backgroundColor: "#25273a",
              color: theme.palette.common.white,
            }}
            component={Link}
            to="/matchday"
          >
            Ir a Jornadas
          </StyledButton>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default ProfilePage;
