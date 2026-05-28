import React from 'react';
import { motion } from 'motion/react';
import { Users, BookOpen, CreditCard, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency, cn } from '../lib/utils';
import { Attendance, Mark, FeePayment } from '../types';

interface DashboardViewProps {
  attendance: Attendance[];
  marks: Mark[];
  fees: FeePayment[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({ attendance, marks, fees }) => {
  const totalStudents = 2; // For mock
  const avgAttendance = 85; // Simplified
  const totalRevenue = fees.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);

  const chartData = [
    { name: 'Mon', count: 18 },
    { name: 'Tue', count: 20 },
    { name: 'Wed', count: 15 },
    { name: 'Thu', count: 22 },
    { name: 'Fri', count: 19 },
  ];

  const stats = [
    { label: 'Total Students', value: totalStudents, icon: Users, color: 'bg-blue-500' },
    { label: 'Present Today', value: '92%', icon: Activity, color: 'bg-green-500' },
    { label: 'Subjects', value: 8, icon: BookOpen, color: 'bg-purple-500' },
    { label: 'Fees Collected', value: formatCurrency(totalRevenue), icon: CreditCard, color: 'bg-orange-500' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header>
        <h2 className="text-3xl font-bold text-slate-800">Campus Overview</h2>
        <p className="text-slate-500 mt-1">Real-time performance and financial snapshots.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/50 flex items-center gap-5"
          >
            <div className={`${stat.color} p-3 rounded-xl text-white`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 font-sans">Attendance Trends</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Fee Payments</h3>
          <div className="space-y-4">
            {fees.slice(0, 4).map((fee) => (
              <div key={fee.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold",
                    fee.status === 'paid' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                  )}>
                    {fee.type[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{fee.type} Fee</p>
                    <p className="text-xs text-slate-500">{fee.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{formatCurrency(fee.amount)}</p>
                  <p className={cn(
                    "text-[10px] uppercase font-bold tracking-widest",
                    fee.status === 'paid' ? "text-green-600" : "text-orange-600"
                  )}>{fee.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
