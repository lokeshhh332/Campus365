import React from 'react';
import { motion } from 'motion/react';
import { Search, Calendar as CalendarIcon, MoreVertical } from 'lucide-react';
import { Attendance, Student } from '../types';
import { cn } from '../lib/utils';

interface AttendanceViewProps {
  attendance: Attendance[];
  students: Student[];
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({ attendance, students }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Attendance Tracking</h2>
          <p className="text-slate-500 mt-1">Monitor student daily presence and absence logs.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search students..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <CalendarIcon size={16} />
            Mark Today
          </button>
        </div>
      </header>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 font-bold text-slate-600 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-4 font-bold text-slate-600 uppercase tracking-wider">ID / Roll No</th>
              <th className="px-6 py-4 font-bold text-slate-600 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-4 font-bold text-slate-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 font-bold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-bold text-slate-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((log) => {
              const student = students.find(s => s.id === log.studentId);
              return (
                <tr key={log.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                        {student?.name[0]}
                      </div>
                      <span className="font-bold text-slate-800">{student?.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{student?.rollNo}</td>
                  <td className="px-6 py-4 text-slate-600">{log.subject}</td>
                  <td className="px-6 py-4 text-slate-500">{log.date}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                      log.status === 'present' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-slate-400 p-2 rounded-lg hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
