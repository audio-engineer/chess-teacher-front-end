"use client";

import Chessboard from "@/components/chessboard";
import type { FC, ReactElement } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Loader from "@/components/loader";
import { redirect } from "next/navigation";
import Paper from "@mui/material/Paper";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Chat from "@/components/chat";

const Game: FC = (): ReactElement | null => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.error(error);
  }

  if (!user) {
    redirect("/");
  }

  return (
    <Paper sx={{ display: "flex", height: "80%", width: "100%", p: 4 }}>
      <Grid container sx={{ width: "100%" }}>
        <Grid xs={6}>
          <Chessboard />
        </Grid>
        <Grid xs={6}>
          <Chat />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Game;
