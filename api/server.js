const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  db.select()
    .from("accounts")
    .then((accounts) => {
      res.json(accounts);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving accounts", err });
    });
});

server.get("/:id", (req, res) => {
  db.select()
    .from("accounts")
    .where({ id: req.params.id })
    .first()
    .then((account) => {
      if (account) {
        res.json(account);
      } else {
        res.status(400).json({ message: "Account not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving account", err });
    });
});

server.post("/", (req, res) => {
  const accountData = req.body;

  db("accounts")
    .insert(accountData)
    .then(() => {
      res.status(201).json({ message: "Account created successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create account", err });
    });
});

server.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("accounts")
    .where({ id })
    .update(changes)
    .then((account) => {
      if (account) {
        res.json({ message: "Account updated successfully" });
      } else {
        res.status(404).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update account", err });
    });
});

server.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("accounts")
    .where({ id })
    .delete()
    .then((account) => {
      if (account) {
        res.json({ message: "Account deleted successfully" });
      } else {
        res.status(404).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete account", err });
    });
});

module.exports = server;
