import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import apiClient from "src/services/api-client";

const TeamDetailPage = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/teams/${teamId}`);
        setTeam(response.data);
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
    };

    fetchData();
  }, [teamId]);

  const handleDeletePlayer = async (playerId) => {
    setSelectedPlayerId(playerId);
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedPlayerId(null);
    setOpenModal(false);
  };

  const confirmDeletePlayer = async () => {
    try {
      await apiClient.put(`/teams/${teamId}/${selectedPlayerId}`);

      setTeam((prevTeam) => {
        const updatedPlayers = prevTeam.players.filter(
          (player) => player._id !== selectedPlayerId
        );
        return { ...prevTeam, players: updatedPlayers };
      });

      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting player from team:", error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Detalles del Equipo
      </Typography>
      <Button
        component={Link}
        to="/team/list"
        sx={{
          backgroundColor: "#424459",
          color: theme.palette.common.white,
        }}
        variant="contained"
        size="small"
      >
        Volver a la lista
      </Button>

      <List>
        <ListItem>
          <ListItemText primary={`Equipo: ${team.name}`} />
          <Typography variant="h6">Jugadores:</Typography>
          <List>
            {team.players &&
              team.players.map((player) => (
                <ListItem key={player._id}>
                  <ListItemText
                    primary={player.username}
                    secondary={player.position}
                  />

                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#25273a",
                      color: theme.palette.common.white,
                    }}
                    onClick={() => handleDeletePlayer(player._id)}
                    startIcon={<DeleteIcon />}
                  ></Button>
                </ListItem>
              ))}
          </List>
        </ListItem>
      </List>

      <Dialog open={openModal} onClose={closeDeleteModal}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este jugador?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteModal}>Cancelar</Button>
          <Button onClick={confirmDeletePlayer} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeamDetailPage;
