export interface Employee {
  id: number;
  name: string;
  nickname: string;
  email: string;
  salary: string;
  age: number;
}

const employees: Employee[] = [
  {
    id: 1,
    name: "Noelia O'Kon",
    nickname: "asperiores",
    email: "otho.smitham@example.com",
    salary: "13098.00",
    age: 39,
  },
  {
    id: 2,
    name: "Mr. Enid Von PhD",
    nickname: "alias",
    email: "pollich.cecilia@example.com",
    salary: "35978.00",
    age: 26,
  },
  {
    id: 3,
    name: "Colton Koch",
    nickname: "id",
    email: "little.myrna@example.net",
    salary: "26278.00",
    age: 48,
  },
  {
    id: 4,
    name: "Gregory Vandervort",
    nickname: "vel",
    email: "dock47@example.org",
    salary: "25537.00",
    age: 27,
  },
];

export default employees;
