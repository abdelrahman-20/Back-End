const PORT = 3000;
const express = require("express");
const app = express();

app.listen(PORT, () => {
    console.log(`Server Started on Port: ${PORT}`);
});
