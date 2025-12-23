import { google } from "googleapis";

interface RegistrationData {
  employeeId: string;
  name: string;
  password:string;
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

const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = "1m7xwBRAkmTkryko2C-WluaM4nqeOB2MFjmBGeJoc7mE";

export const appendRegistration = async (data: RegistrationData) => {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Users!A:G", // Adjusted range to include all columns
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          data.employeeId,
          data.name,
          data.email,
          data.password,
          data.department,
          data.phone || "",
          data.timestamp
        ]]
      }
    });
    return true;
  } catch (error) {
    console.error("Error appending registration:", error);
    throw error;
  }
};

export const checkUserLogin = async (employeeId: string, password: string): Promise<Omit<RegistrationData, "password"> | null> => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Users!A:G", // Fetch all columns
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return null;
    }

    // Assuming the first row might be headers, but we'll check all rows just in case.
    // If you have headers, you might want to skip the first row: rows.slice(1)
    
    // Columns: 
    // 0: employeeId
    // 1: name
    // 2: email
    // 3: password
    // 4: department
    // 5: phone
    // 6: timestamp

    const userRow = rows.find(row => row[0] === employeeId && row[3] === password);

    if (userRow) {
        console.log(userRow)
      return {
        employeeId: userRow[0],
        name: userRow[1],
        email: userRow[2],
        // password is excluded
        department: userRow[4],
        phone: userRow[5],
        timestamp: userRow[6],
      };
    }

    return null;
  } catch (error) {
    console.error("Error checking user login:", error);
    throw error;
  }
};

export const appendScore = async (data: GameScoreData) => {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Scores!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          data.employeeId,
          data.name,
          data.game,
          data.score,
          data.entries,
          data.timestamp
        ]]
      }
    });
    return true;
  } catch (error) {
    console.error("Error appending score:", error);
    throw error;
  }
};

export const getUserScores = async (employeeId: string): Promise<GameScoreData[]> => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Scores!A:F",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    // Columns:
    // 0: employeeId
    // 1: name
    // 2: game
    // 3: score
    // 4: entries
    // 5: timestamp

    const userScores = rows
      .filter(row => row[0] === employeeId)
      .map(row => ({
        employeeId: row[0],
        name: row[1],
        game: row[2],
        score: Number(row[3]),
        entries: Number(row[4]),
        timestamp: row[5],
      }));

    return userScores;
  } catch (error) {
    console.error("Error fetching user scores:", error);
    throw error;
  }
};
