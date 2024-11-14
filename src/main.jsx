import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Converter from "./Converter.jsx";
import "@fontsource/vazirmatn";

import { ThemeProvider, createTheme } from '@mui/material/styles';
const THEME = createTheme({
    typography: {
        "fontFamily": `"Vazirmatn", "Roboto", "Helvetica", "Arial", sans-serif`,
        // "fontSize": 14,
        // "fontWeightLight": 300,
        // "fontWeightRegular": 400,
        // "fontWeightMedium": 500
    }
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider theme={THEME}>
          <Converter/>
      </ThemeProvider>
  </StrictMode>,
)
