"use client";
import React from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import UserTable from "./components/userTable";

const UsersPage = () => {
  return (
    <PageContainer title="Gestión de Usuarios" description="Administrar usuarios del sistema">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashboardCard title="Lista de Usuarios">
              <UserTable />
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default UsersPage;
