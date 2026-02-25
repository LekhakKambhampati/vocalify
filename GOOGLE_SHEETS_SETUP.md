# How to Connect Google Sheets to Vocalify

Follow these steps to automatically save "Book a Demo" leads to a Google Sheet.

## Step 1: Create a Google Cloud Project & Service Account

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Click the project dropdown at the top and select **"New Project"**. Name it "Vocalify Leads" and click **Create**.
3.  In the search bar at the top, type **"Google Sheets API"** and select it.
4.  Click **Enable**.
5.  In the search bar, type **"Service Accounts"** (under IAM & Admin) and select it.
6.  Click **"+ Create Service Account"**.
    *   **Name**: `vocalify-sheet-bot`
    *   **Description**: "Writes leads to Google Sheets"
    *   Click **Create and Continue**.
    *   (Optional) Grant this service account access to project: Select **"Editor"** (or leave blank as we only need sheet access).
    *   Click **Done**.
7.  You will see your new service account in the list. Copy the **Email** address (it looks like `vocalify-sheet-bot@project-id.iam.gserviceaccount.com`). **Save this for later.**

## Step 2: Generate a Private Key

1.  Click on the Service Account you just created (the email link).
2.  Go to the **"Keys"** tab.
3.  Click **"Add Key"** > **"Create new key"**.
4.  Select **JSON** and click **Create**.
5.  A JSON file will automatically download to your computer.
6.  Open this file with a text editor (Notepad, TextEdit, VS Code).
7.  Find the `"private_key"` value. It starts with `-----BEGIN PRIVATE KEY-----` and ends with `-----END PRIVATE KEY-----`. **Copy this entire string.**

## Step 3: Prepare Your Google Sheet

1.  Go to [Google Sheets](https://sheets.google.com) and create a **Blank** spreadsheet.
2.  Name it **"Vocalify Leads"**.
3.  In the first row (Row 1), add these exact headers:
    *   **A1**: `Timestamp`
    *   **B1**: `Name`
    *   **C1**: `Email`
    *   **D1**: `Contact`
    *   **E1**: `Business`
4.  **Important**: Click the **"Share"** button in the top right.
5.  Paste the **Service Account Email** you copied in Step 1 (e.g., `vocalify-sheet-bot@...`).
6.  Make sure the permission is set to **"Editor"**.
7.  Click **Send** (uncheck "Notify people" if asked, as it's a bot).
8.  Look at the URL of your spreadsheet. It looks like this:
    `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjGMuwqny.../edit`
    The long string between `/d/` and `/edit` is your **Sheet ID**. Copy this.

## Step 4: Configure AI Studio

1.  Go to the **Secrets** or **Environment Variables** panel in AI Studio.
2.  Add the following three variables:

    *   **Key**: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
        *   **Value**: Paste the service account email from Step 1.

    *   **Key**: `GOOGLE_PRIVATE_KEY`
        *   **Value**: Paste the private key from Step 2.
        *   *Note: Ensure you include the full `-----BEGIN...` and `...END-----` parts.*

    *   **Key**: `GOOGLE_SHEET_ID`
        *   **Value**: Paste the Sheet ID from Step 3.

## Step 5: Test It

1.  Restart the application (if needed).
2.  Open the website and click **"Book a Demo"**.
3.  Fill out the form and submit.
4.  Check your Google Sheet—the new row should appear instantly!
