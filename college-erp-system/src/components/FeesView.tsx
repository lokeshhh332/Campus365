import React from 'react';
import { motion } from 'motion/react';
import { Wallet, History, AlertCircle, CheckCircle2 } from 'lucide-react';
import { FeePayment, Student } from '../types';
import { formatCurrency, cn } from '../lib/utils';

interface FeesViewProps {
  fees: FeePayment[];
  students: Student[];
}

export const FeesView: React.FC<FeesViewProps> = ({ fees, students }) => {
  const totalPending = fees.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <header className="flex justify-between items-center bg-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-slate-900/10">
        <div>
          <h2 className="text-3xl font-bold">Fee Management</h2>
          <p className="text-slate-400 mt-1 uppercase text-xs font-bold tracking-[0.2em]">Transaction Registry (₹ INR)</p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Receivables Pending</p>
          <p className="text-4xl font-black text-indigo-400 font-mono tracking-tighter">{formatCurrency(totalPending)}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <History size={20} className="text-indigo-600" />
            Recent Invoices
          </h3>
          
          <div className="space-y-3">
            {fees.map((fee) => {
              const student = students.find(s => s.id === fee.studentId);
              return (
                <motion.div 
                  key={fee.id}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center font-bold",
                      fee.status === 'paid' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    )}>
                      {fee.status === 'paid' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 leading-none">{fee.type} Fee - {student?.name}</p>
                      <p className="text-xs text-slate-500 mt-2 font-mono">{fee.receiptNo || 'INV-PENDING'}</p>
                    </div>
                  </div>
                  
                  <div className="text-right flex items-center gap-6">
                    <div>
                      <p className="text-lg font-black text-slate-900">{formatCurrency(fee.amount)}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{fee.date}</p>
                    </div>
                    <button className={cn(
                      "px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                      fee.status === 'paid' 
                        ? "bg-slate-100 text-slate-400 cursor-default" 
                        : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20"
                    )}>
                      {fee.status === 'paid' ? 'Paid' : 'Pay Now'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Wallet size={20} className="text-indigo-600" />
            Quick Shortcuts
          </h3>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <button className="w-full text-left p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 border border-transparent hover:border-indigo-100 transition-all group">
              <p className="font-bold">Generate Fee Voucher</p>
              <p className="text-xs text-slate-500 group-hover:text-indigo-500">Bulk operations for session 2024</p>
            </button>
            <button className="w-full text-left p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 border border-transparent hover:border-indigo-100 transition-all group">
              <p className="font-bold">Scholarship Registry</p>
              <p className="text-xs text-slate-500 group-hover:text-indigo-500">Manage concessions & grants</p>
            </button>
            <button className="w-full text-left p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 italic text-xs text-center cursor-not-allowed">
              Admin Access Only
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
