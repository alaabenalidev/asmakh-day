import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Journey to Laugh | Al Asmakh Real Estate Team Building",
    description: "Join Al Asmakh Real Estate's monthly team building event - Journey to Laugh. Games, prizes, and unforgettable moments every last Tuesday!",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <meta name="author" content="Al Asmakh Real Estate"/>
            <meta name="keywords"
                  content="Al Asmakh, team building, Qatar, real estate, company events, games, prizes"/>
            <meta property="og:title" content="Journey to Laugh - Monthly Team Building Event"/>
            <meta property="og:description"
                  content="Monthly team building events with games, prizes, and fun for all departments!"/>
            <meta property="og:type" content="website"/>
        </head>
        <body className={inter.className}>

        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
