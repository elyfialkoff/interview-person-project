import { Person } from '../../src/person.interface';
import { createPerson } from '../../src/routes/create-person';
import { FileUtil } from '../../src/util/file-util';
import { personsFixture } from '../fixtures/persons.fixture';

describe('Test Create Person Endpoint', () => {
  let res;
  let readPersonSpy;

  beforeEach(() => {
    res = {
      result: {
        message: '',
        data: []
      },
      send: function(input: any) { this.result = input}
    };
    
    readPersonSpy = jest.spyOn(FileUtil.prototype, 'readPersons').mockReturnValue(personsFixture);
  })

  test('should return 404 parameter is missing', () => {
    const expectedResult = 'Must provde firstName and lastName body parameters.';

    const req = {
      body: {
        firstName: 'first'
      }
    }

    createPerson(req, res);

    expect(readPersonSpy).not.toBeCalled();
    expect(res.result.message).toEqual(expectedResult);
  });

  test('should return 200 and create a new Person', () => {
    const expectedResult = {
      id: Math.max(...personsFixture.map((person: Person) => { return person.id })) + 1,
      firstName: 'first',
      lastName: 'last'
    };

    const writePersonSpy = jest.spyOn(FileUtil.prototype, 'writePersons').mockImplementation(() => {});

    const req = {
      body: {
        firstName: 'first',
        lastName: "last"
      }
    }

    createPerson(req, res);

    expect(readPersonSpy).toBeCalled();
    expect(writePersonSpy).toBeCalled();
    expect(res.result.data).toEqual(expectedResult);
  });
});