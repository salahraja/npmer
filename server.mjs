import express from "express";

// Import necessary libraries
const { Hanko } = require("@teamhanko/hanko-elements");
const supabase = require("supabase"); // Replace with your Supabase library and configuration
const app = express();
// Create a new instance of Hanko
const hankoApi = "https://007385dc-60c3-4e38-bd4d-14dc24193b70.hanko.io";
const hanko = new Hanko(hankoApi);

// Authentication endpoint
app.post("/authenticate", async (req, res) => {
  try {
    // Get the authentication data from the request body
    const { authenticationData } = req.body;

    // Perform authentication using Hanko and Supabase
    // Replace with your authentication logic
    const authenticated = await hanko.authenticate(authenticationData);
    const user = await supabase.authenticate(authenticated.userId);

    // Handle successful authentication
    res.status(200).json({ success: true, user });
  } catch (error) {
    // Handle authentication error
    res.status(400).json({ success: false, error: error.message });
  }
});
