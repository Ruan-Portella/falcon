import express from 'express';

const app = express();

const port = process.env.PORT_BACKEND || 8081;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
