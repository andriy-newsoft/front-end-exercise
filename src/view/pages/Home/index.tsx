import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../store/hooks";
import { selectNotification } from "../../../store/modules/user/selectors";
import { useLazyNotificationsQuery } from "../../../services/rtkQuery/user";

const Home = () => {
  const [getNotification] = useLazyNotificationsQuery();
  const notification = useAppSelector(selectNotification);

  useEffect(() => {
    getNotification({ id: "1" });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1" component="h3" sx={{ fontSize: "20px" }}>
        {notification?.description}
      </Typography>
    </Box>
  );
};

export default Home;
