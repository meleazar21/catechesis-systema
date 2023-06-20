import { IBirthDatesRecord } from "@/interfaces/api/birthdates";
import { IStudentBirthDate } from "@/interfaces/api/student-birthdate"
import { IUserBirthDates } from "@/interfaces/api/user-birthdates"

export const combineBirthDates = (students: Array<IStudentBirthDate>, catechistas: Array<IUserBirthDates>) => {
    const studentsRecords = students.map(s => {
        const record: IBirthDatesRecord = {
            id: `${s.id}-s`,
            fullName: `${s.name} ${s.middleName} ${s.lastName} ${s.secondLastName}`,
            birthDate: s.birthdate
        };
        return record;
    });
    const userRecords = catechistas.map(s => {
        const record: IBirthDatesRecord = {
            id: `${s.id}-c`,
            fullName: s.fullName,
            birthDate: s.birthdate
        };
        return record;
    });
    return studentsRecords.concat(userRecords);
}

export const groupRecordsByMonth = (records: Array<IBirthDatesRecord>) => {
    const studentsByMonth: any = {};
    records.forEach(record => {
        const birthDate = new Date(record.birthDate);
        const birthMonth = birthDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index

        // Check if the birth month is already a key in the 'studentsByMonth' object
        if (studentsByMonth.hasOwnProperty(birthMonth)) {
            studentsByMonth[birthMonth].push(record);
        } else {
            studentsByMonth[birthMonth] = [record];
        }
    });
    return studentsByMonth
}