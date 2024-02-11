import { useState } from 'react';
import './App.css'
import Expenseform from './components/Expenseform'
import ExpenseTable from './components/ExpenseTable';
import expenseData from './expenseData';
import { useLocalStorage } from './hooks/useLocalStorage';
function App() {
  const [expense, setExpense] = useLocalStorage('expense', {
    title: "",
    category: "",
    amount: "",
  });
  const [expenses, setExpenses] = useLocalStorage('expenses', expenseData);
  const [editingRowId, setEditingRowId] = useLocalStorage('editingRowId', '');

  return (
    <>
      <main className='p-10'>
      <h1 className='text-4xl mb-6 font-mono text-center'>Track Your Expense</h1>
      <div className="expense-tracker">
        <Expenseform 
        setExpenses={setExpenses}
        expense={expense}
        setExpense={setExpense}
        editingRowId={editingRowId} 
        setEditingRowId={setEditingRowId} />
        <ExpenseTable 
        expenses={expenses}
        setExpenses={setExpenses}
        setExpense={setExpense}
        setEditingRowId={setEditingRowId} />
      </div>
    </main>
    </>
  )
}

export default App
