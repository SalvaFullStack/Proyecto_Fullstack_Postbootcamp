import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const ViewMatchdayPage = () => {
  const { matchdayId } = useParams();
  const [matchday, setMatchday] = useState({ matches: [] });
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchMatchday = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/matchday/${matchdayId}`
        );
        setMatchday(response.data);
      } catch (error) {
        console.error("Error fetching matchday:", error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchMatchday();
    fetchTeams();
  }, [matchdayId]);

  return (
    <Container component="main" maxWidth="md">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Ver Jornada
        </Typography>
      </div>

      <Grid container spacing={2}>
        {matchday.matches.map((match, index) => (
          <Grid container item key={index} justifyContent="space-between">
            <Grid item xs={5}>
              <Paper style={{ padding: "10px" }}>
                <FormControl fullWidth>
                  <InputLabel id={`team-label-${index}-0`}>
                    Equipo Local
                  </InputLabel>
                  <Select
                    labelId={`team-label-${index}-0`}
                    value={match.homeTeam}
                    label="Equipo Local"
                    disabled
                  >
                    {teams.map((team) => (
                      <MenuItem key={team._id} value={team._id}>
                        {team.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={5}>
              <Paper style={{ padding: "10px" }}>
                <FormControl fullWidth>
                  <InputLabel id={`team-label-${index}-1`}>
                    Equipo Visitante
                  </InputLabel>
                  <Select
                    labelId={`team-label-${index}-1`}
                    value={match.awayTeam}
                    label="Equipo Visitante"
                    disabled
                  >
                    {teams.map((team) => (
                      <MenuItem key={team._id} value={team._id}>
                        {team.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Button
        component={Link}
        to="/matchday"
        color="primary"
        variant="contained"
        startIcon={<ArrowBackIcon />}
        style={{ marginTop: "20px" }}
      >
        Perfil
      </Button>
    </Container>
  );
};

export default ViewMatchdayPage;
