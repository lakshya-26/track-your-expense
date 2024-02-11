import React, { useState } from "react";
import Input from "./Input";
import SelectMenu from "./SelectMenu";

const Expenseform = ({ expense, setExpense, setExpenses, editingRowId, setEditingRowId }) => {

  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "Please Enter Title" },
      { minLength: 2, message: "Title should be at least 2 characters long" },
    ],
    category: [
      { required: true, message: "Please Select a Category" },
    ],
    amount: [{ required: true, message: "Please Enter Amount" },
  {pattern: /^[1-9]\d*(\.\d+)?$/, message: "Please Enter a Valid Number"}
  ],
  };
  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
        validationConfig[key].some((rule) => {
          if(rule.required && !value){
            errorsData[key] = rule.message;
            return true;
          }
          if(rule.minLength && value.length < rule.minLength){
              errorsData[key] = rule.message
              return true;
          }

          if(rule.pattern && !rule.pattern.test(value)){
            errorsData[key] = rule.message;
            return true;
          }
        })
    })

    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateRsult = validate(expense);
    if (Object.keys(validateRsult).length) return;

    if(editingRowId){
      setExpenses((prevState) => 
        prevState.map((prevExpense) => {
          if(prevExpense.id === editingRowId){
            return {...expense, id:editingRowId};
          }
          return prevExpense;
        })
      )
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      setEditingRowId('');
      return;
    }

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({ ...prevState, [name]: value }));

    setErrors({});
  };

  return (
    <form className="expense-form border-2 border-slate-400 rounded-md p-8 bg-slate-50" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        onChange={handleChange}
        error={errors.title}
      />
      <SelectMenu
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        defaultName="Select Category"
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        error={errors.category}
      />
      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        error={errors.amount}
      />
      <div className="input-container"></div>
      <button className="add-btn bg-blue-500 hover:bg-blue-400 text-white font-bold border-b-4 border-blue-700 hover:border-blue-500 rounded">{editingRowId ? 'Save':'Add'}</button>
    </form>
  );
};

export default Expenseform;
