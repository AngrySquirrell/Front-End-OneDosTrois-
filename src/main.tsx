import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider theme={{ fontFamily: "Montserrat, sans-serif" }}>
            <Notifications />
            <App />
        </MantineProvider>
    </React.StrictMode>
);
