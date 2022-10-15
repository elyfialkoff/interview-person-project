import { filename } from '../constants';
import { Person } from "../person.interface";
import { FileUtil } from "../util/file-util";

export const listPersons = (req: any, res: any) => {
  // Filter down to firstName, lastName. If no filter parameters are supplied no filtering is done.
  const first = req.query.firstName;
  const last = req.query.lastName;

  let persons: Person[] | undefined;
  try {
    persons = new FileUtil()
      .readPersons(filename)
  } catch (error) {
    res.statusCode = 500;
    res.send({message: error.message});
    return;
  }

  const filteredPersons: Person[] = persons.filter((person: Person) => {
    const isFirstMatch = first ? person.firstName == first : true;
    const isLastMatch = last ? person.lastName == last : true;

    return isFirstMatch && isLastMatch;
  })

  res.send({data: filteredPersons});
  return;
}