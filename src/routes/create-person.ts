import { filename } from '../constants';
import { Person } from "../person.interface";
import { FileUtil } from "../util/file-util";

export const createPerson = (req: any, res: any) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  if (!firstName || !lastName) {
    res.statusCode = 400;
    res.send({message: "Must provde firstName and lastName body parameters."});
    return;
  }

  const persons: Person[] = new FileUtil().readPersons(filename);
  
  const id = Math.max(...persons.map((person: Person) => {
    return person.id
  })) + 1;

  const person: Person = {
    id: id,
    firstName: firstName,
    lastName: lastName
  }

  new FileUtil().writePersons(filename, [...persons, person]);

  res.send({data: person });
  return;
}