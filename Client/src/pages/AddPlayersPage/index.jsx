import React, { useState, useEffect } from "react";
import apiClient from "src/services/api-client";

import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  AppBar,
  Toolbar,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";

const TeamCreationPage = () => {
  const [teamName, setTeamName] = useState("");
  const [allPlayers, setAllPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [positionFilter, setPositionFilter] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    apiClient.get("/users").then((response) => {
      setAllPlayers(response.data);
      setFilteredPlayers(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setPositionFilter(event.target.value);
    filterPlayers(event.target.value);
  };

  const filterPlayers = (position) => {
    if (position === "") {
      setFilteredPlayers(allPlayers);
    } else {
      const filtered = allPlayers.filter(
        (player) => player.position === position
      );
      setFilteredPlayers(filtered);
    }
  };

  const handleAddPlayer = (player) => {
    setSelectedPlayers([...selectedPlayers, player]);

    const filtered = filteredPlayers.filter((p) => p._id !== player._id);
    setFilteredPlayers(filtered);
  };

  const handleRemovePlayer = (player) => {
    const updatedPlayers = selectedPlayers.filter((p) => p._id !== player._id);
    setSelectedPlayers(updatedPlayers);

    setFilteredPlayers([...filteredPlayers, player]);
  };

  const handleSaveTeam = () => {
    if (selectedPlayers.length < 7) {
      console.error("Debe seleccionar al menos siete jugadores.");
      return;
    }

    if (selectedPlayers.length > 10) {
      toast.error("Los equipos no pueden tener más de diez jugadores");
    }

    apiClient
      .post("/teams", {
        name: teamName,
        players: selectedPlayers.map((player) => player._id),
      })
      .then((response) => {
        toast.success("¡Equipo creado!");
        setTeamName("");
        setSelectedPlayers([]);
      })
      .catch((error) => {
        toast.error("Error al crear el equipo:");
      });
  };

  return (
    <Container component="main" maxWidth="md">
      <Toolbar>
        <Button
          sx={{
            backgroundColor: "#415cbd",
            color: theme.palette.common.white,
          }}
          size="small"
          style={{ marginRight: "10px" }}
          component={Link}
          to="/team/list"
        >
          Lista de Equipos
        </Button>
        <Button
          sx={{
            backgroundColor: "#a48e00",
            color: theme.palette.common.white,
          }}
          size="small"
          style={{ marginRight: "10px" }}
          component={Link}
          to="/matchday"
        >
          Ver Jornada
        </Button>
        <Button
          sx={{
            backgroundColor: "#424459",
            color: theme.palette.common.white,
          }}
          size="small"
          style={{ marginRight: "10px" }}
          component={Link}
          to="/matchdaycreate"
        >
          Crear Jornada
        </Button>
      </Toolbar>

      <Typography variant="h5" align="center" gutterBottom>
        CREAR NUEVO EQUIPO: {teamName}
      </Typography>

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Nombre del Equipo"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          {/* Lista de jugadores generales */}
          <Paper>
            <Typography variant="h6" align="center" gutterBottom>
              Todos los Jugadores
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Filtrar por Posición"
              value={positionFilter}
              onChange={handleFilterChange}
            />
            <List>
              {filteredPlayers.map((player) => (
                <ListItem key={player._id}>
                  <ListItemText
                    primary={player.username}
                    secondary={player.position}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#c7ceea",
                      color: theme.palette.common.black,
                    }}
                    onClick={() => handleAddPlayer(player)}
                    size="small"
                  >
                    Añadir
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          {/* Lista de jugadores del equipo */}
          <Paper>
            <Typography variant="h6" align="center" gutterBottom>
              Jugadores del Equipo
            </Typography>
            <List>
              {selectedPlayers.map((player) => (
                <ListItem key={player._id}>
                  <ListItemText
                    primary={player.username}
                    secondary={player.position}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#25273a",
                      color: theme.palette.common.white,
                    }}
                    onClick={() => handleRemovePlayer(player)}
                    startIcon={<DeleteIcon />}
                  ></Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleSaveTeam}
        disabled={!teamName || selectedPlayers.length < 7}
        sx={{ position: "absolute", top: 100, right: 30, marginTop: 2 }}
      >
        Guardar Equipo
      </Button>
      <ToastContainer />
    </Container>
  );
};

export default TeamCreationPage;
