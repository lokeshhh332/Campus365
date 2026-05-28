export interface Student {
  id: string;
  name: string;
  rollNo: string;
  course: string;
  year: number;
  semester: number;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent';
  subject: string;
}

export interface Mark {
  id: string;
  studentId: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  semester: number;
}

export interface FeePayment {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending';
  type: 'Tuition' | 'Exam' | 'Hostel' | 'Other';
  receiptNo?: string;
}

export type TabType = 'dashboard' | 'attendance' | 'marks' | 'fees';
