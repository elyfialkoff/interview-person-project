import { filename } from '../constants';
import { Person } from "../person.interface";
import { FileUtil } from "../util/file-util";

export const listPersons = (req: any, res: any) => {
  const first = req.query.firstName;
  const last = req.query.lastName;

  const filteredPersons: Person[] = new FileUtil().readPersons(filename).filter((person: Person) => {
    const isFirstMatch = first ? person.firstName == first : true;
    const isLastMatch = last ? person.lastName == last : true;

    return isFirstMatch && isLastMatch;
  })

  res.send({data: filteredPersons});
  return;
}