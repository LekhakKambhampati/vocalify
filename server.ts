import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/book-demo", async (req, res) => {
    const { name, email, contact, business } = req.body;

    if (!name || !email || !contact || !business) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const timestamp = new Date().toISOString();
    
    // 1. Log to Console & Local CSV (Always works)
    console.log("New Lead Received:", { name, email, contact, business });
    try {
      const logEntry = `${timestamp},${name},${email},${contact},${business}\n`;
      fs.appendFileSync(path.join(process.cwd(), "leads.csv"), logEntry);
    } catch (err) {
      console.error("Failed to write to local CSV:", err);
    }

    // 2. Google Sheets Integration
    // Only runs if environment variables are set
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
      try {
        const serviceAccountAuth = new JWT({
          email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();
        
        const sheet = doc.sheetsByIndex[0];
        await sheet.addRow({ 
          Timestamp: timestamp,
          Name: name, 
          Email: email, 
          Contact: contact, 
          Business: business 
        });
        console.log("Successfully added row to Google Sheet");
      } catch (error) {
        console.error("Google Sheets Error:", error);
        // Don't fail the request if Sheets fails, just log it
      }
    } else {
      console.log("Skipping Google Sheets: Missing GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, or GOOGLE_SHEET_ID");
    }

    res.json({ success: true, message: "Demo request received" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving (if we were building for prod)
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
