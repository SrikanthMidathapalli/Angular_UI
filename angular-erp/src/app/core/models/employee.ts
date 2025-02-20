export interface Employee {
    id: number;
    name: string;
    email: string;
    departmentId: number;
    designation: string;
    salary: number;
    status: 'Active' | 'Inactive'; 
    role: 'Employee' | 'Admin';
    password: string;
}
