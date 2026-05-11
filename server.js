const express = require('express');
const scrapeRoutes = require('./routes/scrapeRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());


app.use('/api', scrapeRoutes);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});