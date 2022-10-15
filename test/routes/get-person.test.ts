import { Person } from '../../src/person.interface';
import { getPerson } from '../../src/routes/get-person';
import { FileUtil } from '../../src/util/file-util';
import { personsFixture } from '../fixtures/persons.fixture';

describe('Test Get Person Endpoint', () => {
  let res;

  beforeEach(() => {
    res = {
      result: {
        message: '',
        data: []
      },
      send: function(input: any) { this.result = input}
    };
    
    jest.spyOn(FileUtil.prototype, 'readPersons').mockReturnValue(personsFixture);
  })
  
  test('should return 400 when invalid id is supplied', () => {
    const expectedResult = 'Not a valid Id.';

    const req = {
      params: {
        id: 'not_a_number'
      }
    }

    getPerson(req, res);

    expect(res.result.message).toEqual(expectedResult);
  });

  test('should return 404 when Person is not found', () => {
    const expectedResult = 'Person not found';

    const req = {
      params: {
        id: 11
      }
    }

    getPerson(req, res);

    expect(res.result.message).toEqual(expectedResult);
  });

  test('should return 200 with Person', () => {
    const expectedResult: Person = {
      id: 1,
      firstName: 'A',
      lastName: '1'
    };

    const req = {
      params: {
        id: 1
      }
    }

    getPerson(req, res);

    expect(res.result.data).toEqual(expectedResult);
  });
});