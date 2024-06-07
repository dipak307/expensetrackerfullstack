import React, { useContext, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const BASE_URL = "https://expensetrackerfullstack-backend.vercel.app/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    const handleAxiosError = (error) => {
        if (error.response) {
            setError(error.response.data.message);
        } else {
            setError("An error occurred while processing your request.");
        }
    };

    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}add-income`, income);
            getIncomes();
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            setIncomes(response.data);
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const deleteIncome = async (id) => {
        try {
            const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
            getIncomes();
        } catch (error) {
            handleAxiosError(error);
        }
    };

    // Similar adjustments for addExpense, getExpenses, and deleteExpense...

    return (
        <GlobalContext.Provider
            value={{
                addIncome,
                getIncomes,
                incomes,
                deleteIncome,
                totalIncome,
                addExpense,
                getExpenses,
                deleteExpense,
                totalExpenses,
                expenses,
                totalBalance,
                transactionHistory,
                error,
                setError,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
