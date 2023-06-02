import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import OrderChart from "./OrderChart";
import Deposits from "./Deposits";
import Member from "./Member";
import DonationChart from "./DonationChart";
import Adopt from "./Adopt";
import Board from "./Board";

const defaultTheme = createTheme();

export default function AdminDashboard() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={9}>
            {/* <Grid item xs={12}> */}
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 560,
              }}
            >
              <OrderChart />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 170,
              }}
            >
              <Deposits />
            </Paper>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 374,
                mt: 2,
              }}
            >
              <Adopt />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Board />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Member />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 940,
              }}
            >
              <DonationChart />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
