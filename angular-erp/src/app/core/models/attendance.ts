export interface Attendance {
    id: number;
  employeeId: number;
  date: string;
  status: 'Present' | 'Absent' | 'Leave';
}
