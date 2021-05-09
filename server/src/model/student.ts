export interface Student {
    id: number;
    firstname: string;
    lastname: string;
    email?: string;
}

export const StudentData: Student[] = [
    { id: 1, firstname: 'Vijay', lastname: 'Chauhan', email: 'vijaychauhanssn@gmail.com' },
    { id: 2, firstname: 'Mukesh', lastname: 'Singh', email: 'mukesh@gmail.com' },
    { id: 3, firstname: 'Uday', lastname: 'Chauhan', email: 'uday@gmail.com' },
    { id: 5, firstname: 'VPC', lastname: 'Chauhan', email: 'vpc@gmail.com' },
    { id: 6, firstname: 'Test', lastname: 'Test', email:"test@gmail.com" }
];
