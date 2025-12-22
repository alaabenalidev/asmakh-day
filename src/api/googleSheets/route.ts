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

// Configuration - Replace with your Google Sheet ID and Web App URL
const GOOGLE_SHEET_CONFIG = {
    // Your Google Sheet Web App URL (from Google Apps Script deployment)
    webAppUrl: "", // Will be configured when user provides the URL

    // Sheet names
    sheets: {
        registrations: "Registrations",
        scores: "Scores",
        leaderboard: "Leaderboard",
    },
};

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
export const submitRegistration = async (data: RegistrationData): Promise<boolean> => {
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
            range: "users!A:F",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: {
                    ...data
                }
            }
        });
    } catch (error) {
        console.error("Error submitting registration:", error);
        // Fallback to localStorage
        const existing = JSON.parse(localStorage.getItem("jtl_registrations") || "[]");
        existing.push(data);
        localStorage.setItem("jtl_registrations", JSON.stringify(existing));
        return true;
    }
};

// Submit game score to Google Sheets
export const submitGameScore = async (data: GameScoreData): Promise<boolean> => {
    if (!GOOGLE_SHEET_CONFIG.webAppUrl) {
        // Fallback to localStorage if Google Sheets not configured
        const existing = JSON.parse(localStorage.getItem("jtl_game_scores") || "[]");
        existing.push(data);
        localStorage.setItem("jtl_game_scores", JSON.stringify(existing));
        console.log("Game score saved to localStorage:", data);
        return true;
    }

    try {
        const response = await fetch(GOOGLE_SHEET_CONFIG.webAppUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "score",
                ...data,
            }),
        });
        return true;
    } catch (error) {
        console.error("Error submitting game score:", error);
        // Fallback to localStorage
        const existing = JSON.parse(localStorage.getItem("jtl_game_scores") || "[]");
        existing.push(data);
        localStorage.setItem("jtl_game_scores", JSON.stringify(existing));
        return true;
    }
};

// Fetch leaderboard from Google Sheets
export const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    if (!GOOGLE_SHEET_CONFIG.webAppUrl) {
        // Return mock data if Google Sheets not configured
        return getMockLeaderboard();
    }

    try {
        const response = await fetch(
            `${GOOGLE_SHEET_CONFIG.webAppUrl}?action=leaderboard`
        );
        const data = await response.json();
        return data.leaderboard || getMockLeaderboard();
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return getMockLeaderboard();
    }
};

// Mock leaderboard data
const getMockLeaderboard = (): LeaderboardEntry[] => [
    {rank: 1, name: "Ahmed Al-Rashid", department: "Sales", score: 2450, entries: 48},
    {rank: 2, name: "Sara Mohammed", department: "Marketing", score: 2320, entries: 45},
    {rank: 3, name: "Khalid Hassan", department: "IT", score: 2180, entries: 42},
    {rank: 4, name: "Fatima Ali", department: "HR", score: 2050, entries: 38},
    {rank: 5, name: "Omar Nasser", department: "Operations", score: 1920, entries: 35},
];

// Get all local registrations (for admin view)
export const getLocalRegistrations = (): RegistrationData[] => {
    return JSON.parse(localStorage.getItem("jtl_registrations") || "[]");
};

// Get all local game scores (for admin view)
export const getLocalGameScores = (): GameScoreData[] => {
    return JSON.parse(localStorage.getItem("jtl_game_scores") || "[]");
};

// Configure Google Sheets integration
export const configureGoogleSheets = (webAppUrl: string) => {
    GOOGLE_SHEET_CONFIG.webAppUrl = webAppUrl;
    localStorage.setItem("jtl_sheets_url", webAppUrl);
};

// Load configuration from localStorage
export const loadGoogleSheetsConfig = () => {
    const savedUrl = localStorage.getItem("jtl_sheets_url");
    if (savedUrl) {
        GOOGLE_SHEET_CONFIG.webAppUrl = savedUrl;
    }
};

// Initialize on load
loadGoogleSheetsConfig();

/*
GOOGLE APPS SCRIPT TEMPLATE
---------------------------
To set up Google Sheets as a backend, create a new Google Apps Script with this code:

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const data = JSON.parse(e.postData.contents);
  
  if (data.action === 'register') {
    const regSheet = sheet.getSheetByName('Registrations');
    regSheet.appendRow([
      data.employeeId,
      data.name,
      data.email,
      data.department,
      data.phone || '',
      data.timestamp
    ]);
  } else if (data.action === 'score') {
    const scoreSheet = sheet.getSheetByName('Scores');
    scoreSheet.appendRow([
      data.employeeId,
      data.name,
      data.game,
      data.score,
      data.entries,
      data.timestamp
    ]);
  }
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  
  if (e.parameter.action === 'leaderboard') {
    const scoreSheet = sheet.getSheetByName('Scores');
    const data = scoreSheet.getDataRange().getValues();
    // Process and return leaderboard
  }
  
  return ContentService.createTextOutput(JSON.stringify({leaderboard: []}))
    .setMimeType(ContentService.MimeType.JSON);
}
*/
