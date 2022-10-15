# persons
This project is a basic TypeScript / Node / Express Back-End Application for Persons

## Setup
### Prerequisites
node version 16

npm version 7.10.0

### Installation
`npm i`

### Build
`npm run build`

### Start
`npm run start`

### Usage
```typescript
GET /person/{id}
200
{
  data: {
    id: number,
    firstName: string,
    lastName: string
  }
}

400
{
  message: "Not a valid Id."
}

404
{
  message: "Person not found."
}

500
{
  message: "Missing File: Cannot read persons from file."
}

POST /person
body {
  firstName: string,
  lastName: string
}

200
{
  data: {
    id: number,
    firstName: string,
    lastName: string
  }
}

400
{
  message: "Must provde firstName and lastName body parameters."
}

500
{
  message: "Missing File: Cannot read persons from file."
}

POST /person/list?firstName={first}&lastName={last}
200
{
  data: [
    {
      id: number,
      firstName: string,
      lastName: string
    },
    ...
  ]
}

500
{
  message: "Missing File: Cannot read persons from file."
}
```

### Test
`npm run test`