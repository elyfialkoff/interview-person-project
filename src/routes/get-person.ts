import { filename } from '../constants';
import { Person } from "../person.interface";
import { FileUtil } from '../util/file-util';


export const getPerson = (req: any, res: any) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.statusCode = 400;
    res.send({message: "Not a valid Id."});
    return;
  }
  const person: Person | undefined = new FileUtil().readPersons(filename).find((person: Person) => { return person.id == id });

  if (!person) {
    res.statusCode = 404; 
    res.send({message: "Person not found"});
    return;
  }

  res.send({data: person});
  return;
}