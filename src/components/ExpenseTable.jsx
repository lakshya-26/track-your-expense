import React, { useState } from 'react'
import { useFilter } from '../hooks/useFilter'
import ContextMenu from './ContextMenu';

const ExpenseTable = ({expenses, setExpenses, setExpense, setEditingRowId}) => {
  const [filteredData, setQuery] = useFilter(expenses, (data) => data.category);
  const [menuPosition, setMenuPosition] = useState({})
  const [rowId, setRowId] = useState('');
  const [sortCallback, setSortCallback] = useState(() => () => {})

  const total =  filteredData.reduce((acc, current) => acc + Number(current.amount),0)
  return (
    <>
    <ContextMenu 
    menuPosition={menuPosition} 
    expenses={expenses}
    setExpense={setExpense} 
    setMenuPosition={setMenuPosition} 
    setExpenses={setExpenses} 
    rowId={rowId}
    setEditingRowId={setEditingRowId} />
    <table className="expense-table w-full text-sm text-left rtl:text-right" onClick={() => {
              if(menuPosition.left){
                setMenuPosition({})
              }}}>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>Title</th>
              <th scope='col' className='px-6 py-3'>
                <select onChange={(e) => setQuery(e.target.value.toLowerCase())}>
                  <option value="">All</option>
                  <option value="grocery">Grocery</option>
                  <option value="clothes">Clothes</option>
                  <option value="bills">Bills</option>
                  <option value="education">Education</option>
                  <option value="medicine">Medicine</option>
                </select>
              </th>
              <th className="amount-column scope='col' className='px-6 py-3'">
                <div>
                  <span>Amount</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    className="arrow up-arrow"
                    onClick={() => {
                      setSortCallback(() => (a,b) => a.amount - b.amount)
                    }}
                  >
                    <title>Ascending</title>
                    <path
                      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    className="arrow down-arrow"
                    onClick={() => {
                      setSortCallback(() => (a,b) => b.amount - a.amount)
                    }}
                  >
                    <title>Descending</title>
                    <path
                      d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                    />
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              filteredData.sort(sortCallback).map(({id, title, category, amount}) => {
                return (<tr key={id} onContextMenu={(e) => {
                  e.preventDefault()
                  setMenuPosition({left:e.clientX, top:e.clientY})
                  setRowId(id)
                }}>
                <td>{title}</td>
                <td>{category}</td>
                <td>₹{amount}</td>
              </tr>)
              })
            }
            <tr>
              <th scope='col' className='px-6 py-3'>Total</th>
              <th scope='col' className='px-6 py-3'></th>
              <th scope='col' className='px-6 py-3'>₹{total}</th>
            </tr>
          </tbody>
        </table>
        </>
  )
}


export default ExpenseTable