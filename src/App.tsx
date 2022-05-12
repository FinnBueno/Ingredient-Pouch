import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import { ToastContainer } from 'react-toastify';
import { GlobalStyle, theme } from './services/theme/configuration';
import { LoadingBar } from './molecules';
import { PageManager } from 'src/pages/router';
import { AuthProvider } from 'src/services/auth';

const App: React.FC<{}> = () => (
    <Router>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
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
)

export default App;
