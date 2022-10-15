import express from "express";
import { createPerson } from "./routes/create-person";
import { listPersons } from "./routes/list-persons";
import { getPerson } from './routes/get-person';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/person/:id', getPerson);

app.post('/person/list', listPersons);

app.post('/person', createPerson);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})