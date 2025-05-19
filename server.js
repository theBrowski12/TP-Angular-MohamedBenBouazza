const express = require('express');
const path = require('path');

const app = express();
const PORT = 8085;

const LOCALES = ['fr', 'en', 'ar']; // ajoute toutes les langues ici

LOCALES.forEach((locale) => {
  const localePath = path.join(__dirname, 'dist/tp4-mohamed-ben-bouazza/browser', locale);

  // Sert les fichiers statiques pour chaque langue
  app.use(`/${locale}`, express.static(localePath));

  // Fallback vers index.html pour le routing Angular
  app.get(`/${locale}/*`, (req, res) => {
    res.sendFile(path.join(localePath, 'index.html'));
  });
});

// Redirige vers fr par défaut
app.get('/', (req, res) => {
  res.redirect('/fr');
});

app.listen(PORT, () => {
  console.log(`🌍 App localisée disponible sur :`);
  console.log(`➡️  http://localhost:${PORT}/fr`);
  console.log(`➡️  http://localhost:${PORT}/en`);
  console.log(`➡️  http://localhost:${PORT}/ar`);
});