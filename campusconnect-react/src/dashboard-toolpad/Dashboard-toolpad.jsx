// campusconnect-react/src/dashboard-toolpad/Dashboard-toolpad.jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useDemoRouter } from '@toolpad/core/internal';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Analytics from './pages/analytics/Analytics.jsx'
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
        component: Dashboard
    },
    {
        kind: 'divider',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'analytics',
                title: 'Analytics',
                icon: <AnalyticsRoundedIcon />,
                component: Analytics
            },
        ],
    },
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }) {
    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography>Dashboard content for {pathname}</Typography>
        </Box>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function SidebarFooter({ mini }) {
    return (
        <Typography
            variant="caption"
            sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
            {mini ? '© CC' : `© ${new Date().getFullYear()} CampusConnect`}
        </Typography>
    );
}

SidebarFooter.propTypes = {
    mini: PropTypes.bool.isRequired,
};

function DashboardLayoutBasic({ children }) {
    const router = useDemoRouter('/dashboard');
    const pathSegments = router.pathname.split('/');
    const currentSegment = pathSegments[pathSegments.length - 1] || 'dashboard';

    const getCurrentComponent = () => {
        // First check main navigation
        const mainRoute = NAVIGATION.find(item => item.segment === currentSegment);
        if (mainRoute?.component) return mainRoute.component;

        // Then check nested routes
        for (const item of NAVIGATION) {
            if (item.children) {
                const childRoute = item.children.find(child => child.segment === currentSegment);
                if (childRoute?.component) return childRoute.component;
            }
        }
        return null;
    };

    const CurrentComponent = getCurrentComponent();

    return (
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                logo: <img src="/campus_connect_icon.png" alt="Campus Connect Logo" />,
                title: 'Campus Connect',
            }}
            router={router}
            theme={demoTheme}
        >
            <DashboardLayout>
                {CurrentComponent ? <CurrentComponent /> : children}
            </DashboardLayout>
        </AppProvider>
    );
}

DashboardLayoutBasic.propTypes = {
    children: PropTypes.node,
};

export default DashboardLayoutBasic;