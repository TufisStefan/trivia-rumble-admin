import "./App.css";
import { MantineProvider, Stack } from "@mantine/core";
import themeOverrides from "../mantineThemeOverrides";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import "@mantine/core/styles.css";

function App() {
  return (
    <MantineProvider theme={themeOverrides}>
      <BrowserRouter>
        <Stack w={"100vw"} h={"100vh"} justify="center" align="center" p={24}>
          <AppRoutes />
        </Stack>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
