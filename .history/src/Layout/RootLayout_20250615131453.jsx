import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <ScrollRestoration></ScrollRestoration>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;