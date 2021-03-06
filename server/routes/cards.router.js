const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

/**
 * routes for cards
 */

// GET cards if authenticated
router.get("/", (req, res) => {
  // store query string in route scope
  const query = `
      SELECT * FROM "cards"
      ORDER BY "id" ASC`;
  pool
    .query(query)
    .then((result) => {
      // sends cards rows to client on successful pool query
      res.send(result.rows);
    })
    .catch((error) => {
      console.error(error);
      // sends response 500 'Internal Server Error' on pool query error
      res.sendStatus(500);
    });
});

module.exports = router;
