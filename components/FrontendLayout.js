import TopMenu from "../components/TopMenu"
import Footer from "../components/Footer"

import CssBaseline from "@mui/material/CssBaseline"
import Head from 'next/head';
import Divider from '@mui/material/Divider';
import React from "react"
export default function FrontendLayout({ children }) {
    return (
        <React.Fragment >
            <Head>
                {/* <link rel="favicon icon" href="favicon.ico" /> */}
            </Head>
            <TopMenu />
            <Divider />
                {children}
            <Footer />
        </React.Fragment>
    )

}
