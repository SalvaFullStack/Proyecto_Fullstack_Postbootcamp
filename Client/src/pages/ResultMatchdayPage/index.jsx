import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import apiClient from "src/services/api-client";

const ResultMatchdayPage = () => {
  const [matchdayData, setMatchdayData] = useState({});
  const [matchdayResults, setMatchdayResults] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    apiClient
      .get("/matchday")
      .then((response) => {
        setMatchdayData(response.data);

        setMatchdayResults(
          response.data.matches.map((match) => ({
            homeTeamResult: "",
            awayTeamResult: "",
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching matchday data:", error);
      });
  }, []);

  const handleResultChange = (index, type, value) => {
    const updatedResults = [...matchdayResults];
    if (type === "home") {
      updatedResults[index].homeTeamResult = value;
    } else if (type === "away") {
      updatedResults[index].awayTeamResult = value;
    }
    setMatchdayResults(updatedResults);
  };

  const handleSaveResults = async () => {
    // Prepare data to be sent to the API
    const resultsData = {
      results: matchdayResults,
    };

    try {
      // Send the results data to update the matchday with the given matchdayId
      const response = await apiClient.put(
        `/matchday/${matchdayId}`,
        resultsData
      ); // Update the endpoint according to your API route
      console.log("Results saved:", response.data);
      toast.success("Resultados guardados exitosamente");
    } catch (error) {
      console.error("Error al guardar los resultados:", error);
      toast.error("Error al guardar los resultados");
    }
  };

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
          Resultados de la Jornada
        </Typography>
        <Button
          component={Link}
          to="/matchday"
          sx={{
            backgroundColor: "#424459",
            color: theme.palette.common.white,
          }}
          variant="contained"
          size="small"
        >
          Volver a la Jornada
        </Button>
      </div>

      <Grid container spacing={2}>
        {matchdayData.matches.map((match, index) => (
          <Grid container item key={index} justifyContent="space-between">
            <Grid item xs={5}>
              <Paper style={{ padding: "10px" }}>
                {/* Display the home team */}
                <Typography variant="subtitle1">
                  Equipo Local: {match.homeTeam.name}
                </Typography>
              </Paper>
            </Grid>
            <Grid
              item
              xs={1}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5">VS</Typography>
            </Grid>
            <Grid item xs={3}>
              <Paper style={{ padding: "10px" }}>
                {/* Input for home team result */}
                <TextField
                  fullWidth
                  type="number"
                  label="Resultado Equipo Local"
                  variant="outlined"
                  value={matchdayResults[index].homeTeamResult}
                  onChange={(e) =>
                    handleResultChange(index, "home", e.target.value)
                  }
                />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper style={{ padding: "10px" }}>
                {/* Input for away team result */}
                <TextField
                  fullWidth
                  type="number"
                  label="Resultado Equipo Visitante"
                  variant="outlined"
                  value={matchdayResults[index].awayTeamResult}
                  onChange={(e) =>
                    handleResultChange(index, "away", e.target.value)
                  }
                />
              </Paper>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12} style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSaveResults}
        >
          Guardar Resultados
        </Button>
      </Grid>
    </Container>
  );
};

export default ResultMatchdayPage;
