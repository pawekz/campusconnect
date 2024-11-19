// campusconnect-react/src/dashboard-toolpad/Dashboard-toolpad.jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useDemoRouter } from '@toolpad/core/internal';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Dashboard from './Dashboard.jsx'
import Analytics from '../analytics/Analytics.jsx'
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import ManageUser from './users/ManageUser.jsx'
import Account from "../../../components/authentication/Account.jsx";

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
        segment: 'dashboard/users',
        title: 'User Management',
        icon: <PeopleIcon />,
        component: ManageUser
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
    const [session, setSession] = React.useState(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            return {
                user: {
                    name: decoded.name,
                    email: decoded.email,
                    image: decoded.image || '/default-avatar.png',
                }
            };
        }
        return null;
    });

    const authentication = React.useMemo(() => ({
        signIn: (userData) => {
            setSession({
                user: {
                    name: userData.name,
                    email: userData.email,
                    image: userData.image || '/default-avatar.png',
                },
            });
        },
        signOut: () => {
            localStorage.removeItem('token');
            setSession(null);
            router.push('/login');
        },
    }), [router]);

    const pathSegments = router.pathname.split('/');
    const currentSegment = pathSegments[pathSegments.length - 1] || 'dashboard';

    console.log('Current Route State',{
        pathname: router.pathname,
        currentSegment: pathSegments[pathSegments.length -1]
    });

    const getCurrentComponent = () => {
        console.log('Navigation config:', NAVIGATION);
        const mainRoute = NAVIGATION.find(item => item.segment === currentSegment);
        console.log('Found route:', mainRoute);
        return mainRoute?.component;

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
            session={session}
            authentication={authentication}
            navigation={NAVIGATION}
            branding={{
                logo: <img src="/campus_connect_icon.png" alt="Campus Connect Logo" />,
                title: 'Campus Connect',
            }}
            router={router}
            theme={demoTheme}
            topComponents={[<Account key="account" />]}
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