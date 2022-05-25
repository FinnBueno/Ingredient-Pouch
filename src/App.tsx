import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import { ToastContainer } from 'react-toastify';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { GlobalStyle, theme } from './services/theme/configuration';
import { LoadingBar } from './molecules';
import { PageManager } from 'src/pages/router';
import { AuthProvider } from 'src/services/auth';

const App: React.FC<{}> = () => (
    <HelmetProvider>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Ingredient Pouch</title>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
            <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap" rel="stylesheet" />
        </Helmet>
        <Router>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <ToastContainer
                    position='bottom-right'
                    autoClose={1750}
                    draggablePercent={50}
                    hideProgressBar
                />
                <LoadingBar />
                <AuthProvider>
                    {/* Providers go here */}
                    <PageManager />
                </AuthProvider>
            </ThemeProvider>
        </Router>
    </HelmetProvider>
)

export default App;
