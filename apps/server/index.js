import app from "./app.js";

const port = 3001;

await app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Using Node version: ${process.version}`);
});