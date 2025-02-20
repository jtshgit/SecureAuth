import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { getProtected } from './AuthService';
import Detail from './settingItem/Detail';
import Password from './settingItem/Password';
import Toast, { Toaster } from 'react-hot-toast';
import { logout } from './AuthService';

function Setting() {
    const [data, setData] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = new URLSearchParams(location.search).get("redirect") || process.env.REACT_APP_PUBLIC_URL + "/settings";

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await getProtected();
                if (response.data.success) {
                    setData(response.data);
                } else {
                    window.location.href = process.env.REACT_APP_PUBLIC_URL + "/login?redirect=" + redirectPath;
                }
            } catch (error) {
                console.error('Error verifying user:', error);
            }
        };

        verifyUser();
    }, [redirectPath]);

    // Detect screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
        };
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize); // Update on resize

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleLogout = async () => {
        try {
            const response = await Toast.promise(
                logout(),
                {
                    loading: 'Logging Out...', // Optional loading message
                    success: 'Done!',
                    error: 'Invalid User.',
                }
            );
            if (response.data.success) {
                setTimeout(() => {
                    window.location.href = process.env.REACT_APP_PUBLIC_URL + "/login";
                }, 500);
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="container">
            <h1 className="h3 mb-3">Settings</h1>
            {isMobile && (window.location.pathname === '/settings/' || window.location.pathname === '/settings' || window.location.pathname === '/') && (
                <Detail data={data} />
            )}

            <div style={{ display: isMobile ? 'block' : 'flex', minHeight: '0vh' }}>
                {/* Menu */}
                <div className="card" style={{
                    width: isMobile ? '100%' : '25%',
                    padding: '0px',
                    display: isMobile ? ((window.location.pathname === '/settings/' || window.location.pathname === '/settings' || window.location.pathname === '/') ? 'block' : 'none') : 'block'
                }}>
                    <div className="card-header">
                        <h5 className="card-title mb-0">Profile Settings</h5>
                    </div>
                    <div className="list-group list-group-flush" style={{ listStyleType: 'none', padding: 0 }}>
                        {!isMobile ? (
                            <li className="list-group-item list-group-item-action">
                                <Link
                                    to={'/settings/detail'}
                                    style={{
                                        display: 'block',
                                        textDecoration: 'none',
                                        color: '#333'
                                    }}
                                >
                                    Profile Details
                                </Link>
                            </li>
                        ) : (
                            <></>
                        )}


                        <li className="list-group-item list-group-item-action">
                            <Link
                                to={'/settings/password'}
                                style={{
                                    display: 'block',
                                    textDecoration: 'none',
                                    color: '#333'
                                }}
                            >
                                Password
                            </Link>
                        </li>

                        <li className="list-group-item list-group-item-action">
                            <Link
                                onClick={handleLogout}
                                style={{
                                    display: 'block',
                                    textDecoration: 'none',
                                    color: '#333'
                                }}
                            >
                                Logout
                            </Link>
                        </li>
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: '0px 10px' }}>
                    {/* Back button for mobile */}
                    {isMobile && (window.location.pathname !== '/settings/' && window.location.pathname !== '/settings' && window.location.pathname !== '/') && (
                        <button
                            className="button-3"
                            onClick={() => navigate('/settings/')}
                            style={{ marginBottom: '10px' }}
                        >
                            Back
                        </button>

                    )}
                    {!isMobile && (window.location.pathname === '/settings' || window.location.pathname === '/settings/') && (
                        <Detail data={data} />
                    )}
                    <Routes>
                        <Route path="/detail" element={<Detail data={data} />} />
                        <Route path="/password" element={<Password data={data} />} />
                        {/* <Route path="/" element={<div></div>} /> */}

                    </Routes>
                </div>
            </div>
            <div><Toaster
                position="top-center"
                reverseOrder={false}
            /></div>
        </div>
    );
}
export default Setting;
