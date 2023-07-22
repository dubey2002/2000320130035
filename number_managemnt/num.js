const express = require("express");
const axios = require("axios");
const aggregator = require("./aggregator");

const app = express();
const PORT = 3000;

app.get("/numbers", async (req, res) => {
 const urls = req.query.url;
 if (!urls || !Array.isArray(urls)) {
 return res
.status(400)
.json({ error: "bad query." });
}
try { 
 const numbers = await aggregator.aggregate(urls); 
 res.json({ numbers }); 
} catch (error) { 
 console.error(error); 
 return res.status(502).json({ error: "error occured." }); 
}
});
app.listen(PORT, () => { console.log(`http://localhost:${PORT} is running`) });