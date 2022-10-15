import { listPersons } from '../../src/routes/list-persons';
import { FileUtil } from '../../src/util/file-util';
import { Person } from '../../src/person.interface';
import { personsFixture } from '../fixtures/persons.fixture';

describe('Test List Person Endpoint', () => {
  let res: any;

  beforeEach(() => {
    res = {
      result: {
        data: []
      },
      send: function(input: any) { this.result = input}
    };

    jest.spyOn(FileUtil.prototype, 'readPersons').mockReturnValue(personsFixture);
  })
  test('should return 200 with no filters', () => {
    const expectedResult = personsFixture; 
    
    const req: any = {
      query: {}
    };

    listPersons(req, res);

    expect(res.result.data).toEqual(expectedResult);
  });

  test('should return 200 with firstName filter', () => {
    const expectedResult = personsFixture.filter((person: Person) => {
      return person.firstName == 'A'
    }); 

    const req: any = {
      query: {
        firstName: 'A',
      }
    };

    listPersons(req, res);

    expect(res.result.data).toEqual(expectedResult);
  });
  
  test('should return 200 with firstName and lastName filter', () => {
    const expectedResult = personsFixture.filter((person: Person) => {
      return person.firstName == 'B' && person.lastName == '2'
    }); 

    const req: any = {
      query: {
        firstName: 'B',
        lastName: '2'
      }
    };

    listPersons(req, res);

    expect(res.result.data).toEqual(expectedResult);
  });
});