/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { AttendanceView } from './components/AttendanceView';
import { MarksView } from './components/MarksView';
import { FeesView } from './components/FeesView';
import { Student, Attendance, Mark, FeePayment, TabType } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    students: Student[];
    attendance: Attendance[];
    marks: Mark[];
    fees: FeePayment[];
  }>({
    students: [],
    attendance: [],
    marks: [],
    fees: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, attendanceRes, marksRes, feesRes] = await Promise.all([
          fetch('/api/students'),
          fetch('/api/attendance'),
          fetch('/api/marks'),
          fetch('/api/fees'),
        ]);

        setData({
          students: await studentsRes.json(),
          attendance: await attendanceRes.json(),
          marks: await marksRes.json(),
          fees: await feesRes.json(),
        });
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView attendance={data.attendance} marks={data.marks} fees={data.fees} />;
      case 'attendance':
        return <AttendanceView attendance={data.attendance} students={data.students} />;
      case 'marks':
        return <MarksView marks={data.marks} students={data.students} />;
      case 'fees':
        return <FeesView fees={data.fees} students={data.students} />;
      default:
        return <DashboardView attendance={data.attendance} marks={data.marks} fees={data.fees} />;
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-indigo-600 animate-spin" size={40} />
          <p className="text-slate-500 font-medium animate-pulse uppercase tracking-[0.2em] text-xs">Initializing ERP System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
