// Google Sheets Integration Utilities
// This module provides functions to interact with Google Sheets as a backend
import {google} from "googleapis";
import {NextRequest} from "next/server";
// Note: For this to work, you need to:
// 1. Create a Google Sheet
// 2. Publish it to the web (File > Share > Publish to web)
// 3. Set up a Google Apps Script as a web app to handle POST requests

interface RegistrationData {
    employeeId: string;
    name: string;
    email: string;
    password: string;
    department: string;
    phone?: string;
    timestamp: string;
}

interface GameScoreData {
    employeeId: string;
    name: string;
    game: string;
    score: number;
    entries: number;
    timestamp: string;
}

interface LeaderboardEntry {
    rank: number;
    name: string;
    department: string;
    score: number;
    entries: number;
}

const auth = new google.auth.GoogleAuth({
    credentials: {
        type: "service_account",
        project_id: "flawless-star-407410",
        client_email: "sheet-writer@flawless-star-407410.iam.gserviceaccount.com",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDaSw+0qL9bMJky\n6E7SVwOVuEjLnhwuJ4SZt9mH8QctFsoPz75SSVyHHCcJFo1gHncwcBBUjo8ep8m/\nY2wDUTt1f2gSG6I0SBprwl/ZItVESCC1KDmTkztz+QhCTfT3JXrmoRYj/2i8JFsH\nNKqHSBtQeApbvxEFsLa5qW++tCu4pJU780vWSGHN9X2SAR7QL8wzuVELpcm3IrnX\nDGZGBysvEOHYwT0Mt7gOSwnsgHmA3juz7OWKSRtGkBFeIDeCwnZQKXoRjhIMMANL\nwY3ULXhtty0ePhbpedkutpmz97PNwrFC78Yw2ZaVTzKiLp97NOBDbJ5Jdzc8d/Zr\n/Oz9FDptAgMBAAECggEAW2PQg/yf/IAIq3j5wvL+A7ke9OxRdPtDdw2zC0hcDkL7\nvonlbtLa44/kQdhIwQSQNt274IK8pYNuoetwZaUlJQh9nBMoogXL1fCPKzt7mPYv\nh1h7Xm7mFaQdkpDLrYrp/NNVDyYXhakc2RPyDugf010mTQndiQnWPj2TFH6ezVKI\nXLNeMpcrQGUmfTrxfLlW6vN3rOihUqKLLrfBwi3IMS2jz5y+DFlC2Gdc0l1yvpTK\nXhCwupfVTHhvgLChuiP9zl5qkO8+uExf+JH1riIG5W+RoZMnhBs1kKdyBLmbKxwW\n7Ggb0oo+Luy1ZEyI4XI+XAekqaHbuUmn3ahg2AFq+wKBgQDthqJ+PcY/uy2gnFJf\noxyo6TxjMtZ5QmAuo02gm3qOsh/lGsoVfR+RuxC8GKLZu88QlvuU9u43IBqJOMdQ\nd5mmOuY7zAT8r7Q8+DMJ05OOFN1Fo3pqFDMSZNEA0Un1zclTDeCHAkrTKhdd5hXx\nQly+SNdYXbkakXIsg/tI3FGyrwKBgQDrRXw3yfSacpSYHzP7O88U04hPlTpGTpKA\n9t/6l8kg+CPhJTWXZJtVjbQUuCqNJqA2h69zDsfA4i/oznxSMxKIVsvtk0XJiJZA\nZ41bOTJmce07NoPm1k4sgRCBcQZyQSmXYPG+BWyotsVrgfIunJypyb+QyNtAeMG7\nadSeJfkbowKBgGynKM+svHJM0ktlFr1O5P5Tat9J0xg3B75tz0XHuaFq0/I+dfCs\ngvNr6fTRJDWLluXU2xLCfifTVLAuu+YQP8XtrYHvCtz4Fu/I7bfyA857tthzNr0t\nrkscuQqxsi5xy0Vl1K6NmuLLn1LBvInXPIuC0JdIkDMaE2tPmHQ07F5bAoGAIds6\n9/BJEdzBQ27iFRpTP4T9Ta6E109BR+u+6ZnkKKlsyF6JasLgk5wzuPOTtAJF9fLq\nrZ0H49ro2BC21UFiPlp3ODYESe8s6BG+xszhUtq8L9Q1gQd/8mmUTXxNWC3GZXFe\n+GBhdZnvqPvnNQv2g3xz48rzukBmaKjfHu8J/Q8CgYA1GU4QpMDrgBCdBFLS4kb2\nH2QEaDE+1TdnmuHNJXAP+77OY3LPigsxWI/h9WBu15aJC8RowMckTZzk/j2h1Xcm\nJWx+eGNDRav9TlLzgivPKLe+w+20sglxRPNShRYJUrEnymdpfrKEp5tsXU69lp2R\n+TCjBfQj8UyGVsCOxoV4RQ==\n-----END PRIVATE KEY-----\n"
            .replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({version: "v4", auth});

// Submit registration to Google Sheets
export const POST = async (data: RegistrationData): Promise<Response> => {
    try {
        // const response = await fetch(GOOGLE_SHEET_CONFIG.webAppUrl, {
        //   method: "POST",
        //   mode: "no-cors",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     action: "register",
        //     ...data,
        //   }),
        // });
        // return true;
        await sheets.spreadsheets.values.append({
            spreadsheetId: "1m7xwBRAkmTkryko2C-WluaM4nqeOB2MFjmBGeJoc7mE",
            range: "users!A:G",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: {
                    ...data
                }
            }
        });
        return new Response(JSON.stringify({ success: true, message: "Registration successful" }), { status: 200 });
    } catch (error) {
        console.error("Error submitting registration:", error);
        return new Response(JSON.stringify({ success: true, message: "Registration successful" }), { status: 400 });
        // Fallback to localStorage
        // const existing = JSON.parse(localStorage.getItem("jtl_registrations") || "[]");
        // existing.push(data);
        // localStorage.setItem("jtl_registrations", JSON.stringify(existing));
        // return true;
    }
};