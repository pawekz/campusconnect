import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useDemoRouter } from '@toolpad/core/internal';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Dashboard from './Dashboard.jsx';
import ManageUser from '../users/ManageUser.jsx';
import Analytics from '../analytics/Analytics.jsx';
import Account from '../../../components/authentication/Account.jsx';
import Message from '../messages/Message.jsx';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '../../../assets/dashboardIcon2.json?url';
import ReportIcon from '../../../assets/reportIcon.json?url';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '../../../assets/peopleIcon.json?url';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AddShoppingCartIcon from '../../../assets/listing.json?url';
import AddListingIcon from '../../../assets/addListing.json?url';
import AddListing from "../../pages/listing/AddProduct.jsx";
import EditListing from "../../pages/listing/ViewAllListing.jsx";
import EditListingIcon from '../../../assets/editListing.json?url';
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MessageIcon from '../../../assets/chatIcon.json?url';
import {defineElement} from "@lordicon/element";
import lottie from "lottie-web";

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
const NAVIGATION = [
    {
        kind: 'header',
        title: 'Options',
    },
    {
        segment: 'dashboard', //segment is where the folder is
        title: 'Dashboard',
        icon: <lord-icon
            trigger="hover"
            src={DashboardIcon}
            style={{width: '32px', height: '32px'}}
        >
        </lord-icon>
        ,
        component: Dashboard,
    },
    {
        segment: 'users',
        title: 'User Management',
        icon: <lord-icon
            trigger="hover"
            src={PeopleIcon}
            style={{width: '32px', height: '32x'}}
        >
        </lord-icon>
        ,
        component: ManageUser,
    },
    {
        segment: 'listing',
        title: 'Listing',
        icon: <lord-icon
            trigger="hover"
            src={AddShoppingCartIcon}
            style={{width: '32px', height: '32x'}}
        >
        </lord-icon>,
        children: [
            {
                segment: 'add', // Changed from 'listing'
                title: 'Add Listing',
                icon: <lord-icon
                    trigger="hover"
                    src={AddListingIcon}
                    style={{width: '32px', height: '32x'}}
                >
                </lord-icon>,
                component: AddListing,
            },
            {
                segment: 'edit', // Changed from 'listing'
                title: 'Edit Listing',
                icon: <lord-icon
                    trigger="hover"
                    src={EditListingIcon}
                    style={{width: '32px', height: '32x'}}
                >
                </lord-icon>,
                component: EditListing,
            }
        ],
    },
    {
        segment: 'messages',
        title: 'Messages',
        icon: <lord-icon
            trigger="hover"
            src={MessageIcon}
            style={{width: '32px', height: '3x'}}
        >
        </lord-icon>
        ,
        component: Message,
    },
    {
        kind: 'divider',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <AnalyticsRoundedIcon />,
        children: [
            {
                segment: 'analytics',
                title: 'Analytics',
                icon: <AnalyticsRoundedIcon />,
                component: Analytics,
            },
        ],
    },
];


const handleSegmentNavigation = (segment) => {
    router.pathname = `/${segment}`;
};

function DashboardLayoutBasic() {
    defineElement(lottie.animation);

    const navigate = useNavigate();
    const router = useDemoRouter('/dashboard');
    const [session, setSession] = useState(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('Token found in localStorage:', token);
            return {
                user: {
                    token: token,
                },
            };
        }
        console.log('No token found in localStorage');
        return null;
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Retrieved token from localStorage:', token);

        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const validateToken = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/user/validate-token');
                    console.log('Token validation response:', response);

                    if (response.status !== 200) {
                        console.warn('Token validation failed, removing token and redirecting.');
                        localStorage.removeItem('token');
                        navigate('/signin', { replace: true });
                    }
                } catch (error) {
                    console.error('Error during token validation:', error);
                    localStorage.removeItem('token');
                    navigate('/signin', { replace: true });
                }
            };
            validateToken();
        } else {
            console.warn('No token found, redirecting to sign-in.');
            navigate('/signin', { replace: true });
        }
    }, [navigate]);

    const authentication = React.useMemo(
        () => ({
            signIn: (userData) => {
                console.log('User signed in:', userData);
                localStorage.setItem('token', userData.token);
                setSession({
                    user: {
                        name: userData.name,
                        email: userData.email,
                        /*image: userData.image || '/default-avatar.png',*/
                        token: userData.token,
                    },
                });
            },
            signOut: () => {
                console.log('User signed out');
                localStorage.removeItem('token');
                setSession(null);
                navigate('/signin');
            },
        }),
        [navigate]
    );

    const pathSegments = router.pathname.split('/');
    const currentSegment = pathSegments[pathSegments.length - 1] || 'dashboard';

    //test where the URL of USER MANAGEMENT
    useEffect(() => {
        console.table({
            'Current Path': router.pathname,
            'Current Segment': currentSegment,
            'Full URL': window.location.href,
            'Navigation State': {
                from: pathSegments[pathSegments.length - 2] || 'root',
                to: currentSegment
            }
        });
    }, [router.pathname, currentSegment, pathSegments]);

    const getCurrentComponent = () => {
        const mainRoute = NAVIGATION.find((item) => item.segment === currentSegment);
        if (mainRoute?.component) {
            return mainRoute.component;
        }

        const nestedRoute = NAVIGATION.reduce((found, item) => {
            if (found) return found;
            if (item.children) {
                return item.children.find((child) => child.segment === currentSegment);
            }
            return null;
        }, null);

        return nestedRoute?.component || null;
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
            <DashboardLayout defaultSidebarCollapsed>
                {CurrentComponent ? <CurrentComponent /> : <DemoPageContent pathname={router.pathname} />}
            </DashboardLayout>
        </AppProvider>
    );
}

DashboardLayoutBasic.propTypes = {
    children: PropTypes.node,
};


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

export default DashboardLayoutBasic;



