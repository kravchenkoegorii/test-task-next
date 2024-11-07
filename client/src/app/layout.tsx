import {Nunito} from 'next/font/google';

import './globals.css';
import Header from "@/app/components/Header";
import React from "react";

const nunito = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link data-rh="true" rel="icon" href="/favicon.png"/>
        </head>
        <body className={nunito.className}>
        <Header/>
        {children}
        </body>
        </html>
    );
}