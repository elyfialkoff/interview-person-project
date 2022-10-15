import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Person } from 'person.interface';

export class FileUtil {
  public readPersons(filename: string): Person[] {
    try {
      const data = readFileSync(join(__dirname, filename), 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Missing File: Cannot read persons from file.`)
    }
  }

  public writePersons(filename: string, persons: Person[]): void {
    writeFileSync(join(__dirname, filename), JSON.stringify(persons, null, 2), {
      flag: 'w',
    });
  }
}