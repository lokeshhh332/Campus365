import React from 'react';
import { motion } from 'motion/react';
import { Award, Filter, Download } from 'lucide-react';
import { Mark, Student } from '../types';
import { cn } from '../lib/utils';

interface MarksViewProps {
  marks: Mark[];
  students: Student[];
}

export const MarksView: React.FC<MarksViewProps> = ({ marks, students }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Academic Marks</h2>
          <p className="text-slate-500 mt-1">Review student examination scores and GPA performance.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Filter size={16} />
            Semester 4
          </button>
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Download size={16} />
            Report Card
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marks.map((mark) => {
          const student = students.find(s => s.id === mark.studentId);
          const percentage = (mark.marksObtained / mark.totalMarks) * 100;
          return (
            <motion.div
              key={mark.id}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-slate-900">{mark.subject}</p>
                  <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">{student?.name}</p>
                </div>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center font-bold",
                  percentage >= 80 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                )}>
                  <Award size={20} />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-3xl font-black text-slate-900 tracking-tight">{mark.marksObtained}</p>
                    <p className="text-xs text-slate-400 font-medium italic">Out of {mark.totalMarks}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-slate-800">{percentage.toFixed(0)}%</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Score</p>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className={cn(
                      "h-full rounded-full",
                      percentage >= 80 ? "bg-green-500" : "bg-indigo-500"
                    )}
                  />
                </div>
                
                <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest pt-2">
                  <span>Semester {mark.semester}</span>
                  <span>Section B</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
