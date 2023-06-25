import express from "express";
import fetch from "node-fetch";

const app = express();
const port = 4000;
const { packageNames, commands } = req.body;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/packages", async (req, res) => {
  const { packageNames } = req.body;

  try {
    const packageDetails = await Promise.all(
      packageNames.map(async (packageName) => {
        const response = await fetch(
          `https://registry.npmjs.org/${packageName}`
        );
        const data = await response.json();
        return data;
      })
    );

    console.log(packageDetails); // Log the received package details

    res.json(packageDetails);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching package details." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
