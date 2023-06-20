import { queryHasuraGraphQl } from "./hasura";

export const getBirthDatesStudents = async (token: string) => {
    const operationsDoc = `
  query studentsOrdersByBirthdate {
    Student(order_by: {birthdate: asc}) {
      id
      firstName
      middleName
      lastName
      secondLastName
      birthdate
    }
  }`;
    const response = await queryHasuraGraphQl(operationsDoc, "studentsOrdersByBirthdate", {}, token);
    return response.data.Student;
}
export const getBirthDatesCatechistas = async (token: string) => {
    const operationsDoc = `
    query catechistasOrderByBirthDate {
        user(where: {userType: {_eq: 2}}, order_by: {birthdate: asc}) {
          issuer
          id
          fullName
          birthdate
        }
      }`;
    const response = await queryHasuraGraphQl(operationsDoc, "catechistasOrderByBirthDate", {}, token);
    return response.data.user;
} 