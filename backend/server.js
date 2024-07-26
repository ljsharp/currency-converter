const express = require("express");
const mysql = require("mysql2");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// MySQL Database setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "currency_converter",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database.");
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS exchange_rates (
      currency VARCHAR(10) PRIMARY KEY,
      rate FLOAT
    )
  `;
  db.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Exchange rates table created or already exists.");
  });
});

// Endpoint to fetch and update exchange rates
app.get("/update-rates", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const rates = response.data.rates;

    const deleteQuery = "DELETE FROM exchange_rates";
    db.query(deleteQuery, (err, result) => {
      if (err) throw err;

      const insertQuery =
        "INSERT INTO exchange_rates (currency, rate) VALUES ?";
      const values = Object.entries(rates);
      db.query(insertQuery, [values], (err, result) => {
        if (err) throw err;
        res.send("Exchange rates updated");
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating rates");
  }
});

// Endpoint to convert currency
app.get("/convert", (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).send("Missing query parameters");
  }

  const getRateQuery = "SELECT rate FROM exchange_rates WHERE currency = ?";

  db.query(getRateQuery, [from], (err, fromResult) => {
    if (err || fromResult.length === 0) {
      return res.status(500).send("Error fetching from currency rate");
    }

    db.query(getRateQuery, [to], (err, toResult) => {
      if (err || toResult.length === 0) {
        return res.status(500).send("Error fetching to currency rate");
      }

      const fromRate = fromResult[0].rate;
      const toRate = toResult[0].rate;
      const convertedAmount = (amount / fromRate) * toRate;

      res.send({ convertedAmount });
    });
  });
});

app.listen(port, () => {
  console.log(`Currency converter app listening at http://localhost:${port}`);
});
