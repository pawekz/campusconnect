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
import PeopleIcon from '../../../assets/peopleIcon.json?url';
import AddShoppingCartIcon from '../../../assets/listing.json?url';
import AddListingIcon from '../../../assets/addListing.json?url';
import AddListing from "../../pages/listing/AddProduct.jsx";
import EditListing from "../../pages/listing/ViewAllListing.jsx";
import EditListingIcon from '../../../assets/editListing.json?url';
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MessageIcon from '../../../assets/chatIcon.json?url';
import StoreIcon from '../../../assets/storeIcon.json?url';
import {defineElement} from "@lordicon/element";
import lottie from "lottie-web";
import {jwtDecode} from "jwt-decode";
import Home from '../home/Home.jsx';
import Transaction from '../../pages/transaction/Transaction.jsx';
import TransactionIcon from '../../../assets/transactionIcon.json?url';
import AnalyticsIcon from '../../../assets/analyticsIcon.json?url';
import GearIcon from '../../../assets/settingsIcon.json?url';
import { AvatarGenerator } from 'random-avatar-generator';
import ProfilePage from '../profile/ProfilePage.jsx';

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

const getNavigationItems = (userType) => {
    const baseNavigation = [
        {
            kind: 'header',
            title: 'Trade',
        },
        {
            segment: 'home',
            title: 'Home',
            icon: <lord-icon trigger="hover" src={StoreIcon} style={{width: '32px', height: '32x'}}></lord-icon>,
            component: Home,
        },
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Options',
        },
        {
            segment: 'listing',
            title: 'Listing',
            icon: <lord-icon trigger="hover" src={AddShoppingCartIcon} style={{width: '32px', height: '32x'}}></lord-icon>,
            children: [
                {
                    segment: 'add',
                    title: 'Add Listing',
                    icon: <lord-icon trigger="hover" src={AddListingIcon} style={{width: '32px', height: '32x'}}></lord-icon>,
                    component: AddListing,
                },
                {
                    segment: 'edit',
                    title: 'Edit Listing',
                    icon: <lord-icon trigger="hover" src={EditListingIcon} style={{width: '32px', height: '32x'}}></lord-icon>,
                    component: EditListing,
                }
            ],
        },
        {
            segment: 'messages',
            title: 'Messages',
            icon: <lord-icon trigger="hover" src={MessageIcon} style={{width: '32px', height: '32x'}}></lord-icon>,
            component: Message,
        },
        {
            segment: 'transaction',
            title: 'Transaction',
            icon: <lord-icon trigger="hover" src={TransactionIcon} style={{width: '32px', height: '32x'}}></lord-icon>,
            component: Transaction,
        },
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Review',
        },
        {
            segment: 'analytics',
            title: 'Analytics',
            icon: <lord-icon trigger="hover" src={AnalyticsIcon} style={{width: '32px', height: '32x'}}></lord-icon>,
            component: Analytics,
        },
        {
            kind: "divider"
        },
        {
            kind: 'header',
            title: 'ProfilePage',
        },
        {
            segment: 'profile',
            title: 'Profile Management',
            icon: <lord-icon trigger="hover" src={GearIcon} style={{width: '32px', height: '32x'}}></lord-icon>,
            component: () => <ProfilePage authentication={authentication} />
        }
    ];
    //only of the user_id is admin ray maka access to the dashboard
    if (userType === 'admin') {
        baseNavigation.splice(3, 0,
            {
                segment: 'dashboard',
                title: 'Dashboard',
                icon: <lord-icon trigger="hover" src={DashboardIcon} style={{width: '32px', height: '32px'}}></lord-icon>,
                component: Dashboard,
            },
            {
                segment: 'users',
                title: 'User Management',
                icon: <lord-icon trigger="hover" src={PeopleIcon} style={{width: '32px', height: '32x'}}></lord-icon>,
                component: ManageUser,
            }
        );
    }

    return baseNavigation;
};

function DashboardLayoutBasic() {
    const navigate = useNavigate();
    defineElement(lottie.animation);
    const router = useDemoRouter('/dashboard');
    const [navigation, setNavigation] = useState([]);
    const generator = new AvatarGenerator();

    const [session, setSession] = React.useState(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userData = {
                    user: {
                        name: decoded.name,
                        email: decoded.sub,
                        image: generator.generateRandomAvatar('avatar'),
                        token: token,
                        userType: decoded.user_type
                    },
                };
                setNavigation(getNavigationItems(decoded.user_type));
                return userData;
            } catch (error) {
                console.error('Token decode error:', error);
                return null;
            }
        }
        return null;
    });

    const authentication = React.useMemo(() => {
        return {
            signIn: (token) => {
                try {
                    const decoded = jwtDecode(token);
                    const userData = {
                        user: {
                            name: decoded.name,
                            email: decoded.sub,
                            image: generator.generateRandomAvatar('avatar'),
                            token: token,
                            userType: decoded.user_type
                        },
                    };
                    localStorage.setItem('token', token);
                    setSession(userData);
                    setNavigation(getNavigationItems(decoded.user_type));
                } catch (error) {
                    console.error('SignIn token decode error:', error);
                }
            },
            signOut: () => {
                localStorage.removeItem('token');
                setSession(null);
                navigate('/signin');
            },
        };
    }, [navigate, generator]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const validateToken = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/user/validate-token');
                    if (response.status !== 200) {
                        localStorage.removeItem('token');
                        navigate('/signin', { replace: true });
                    }
                } catch (error) {
                    localStorage.removeItem('token');
                    navigate('/signin', { replace: true });
                }
            };
            validateToken();
        } else {
            navigate('/signin', { replace: true });
        }
    }, [navigate]);

    const pathSegments = router.pathname.split('/');
    const currentSegment = pathSegments[pathSegments.length - 1] || 'dashboard';

    //this is required for the signout button of ProfilePage
    const getCurrentComponent = () => {
        const mainRoute = navigation.find((item) => item.segment === currentSegment);
        if (mainRoute?.segment === 'profile') {
            return () => <ProfilePage authentication={authentication} />;
        }
        if (mainRoute?.component) {
            return mainRoute.component;
        }

        const nestedRoute = navigation.reduce((found, item) => {
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
            navigation={navigation}
            branding={{
                logo: <img src="/campus_connect_icon.png" alt="Campus Connect Logo" />,
                title: 'Campus Connect',
            }}
            router={router}
            theme={demoTheme}
            topComponents={[
                <Account
                    key="account"
                    slots={{
                        popoverContent: (props) => (
                            <Profile
                                {...props}
                                session={session}
                                authentication={authentication}
                            />
                        )
                    }}
                />
            ]}
        >
            <DashboardLayout defaultSidebarCollapsed>
                {CurrentComponent ? <CurrentComponent /> : <DemoPageContent pathname={router.pathname} />}
            </DashboardLayout>
        </AppProvider>
    );
}
// Fallback content for undefined routes
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