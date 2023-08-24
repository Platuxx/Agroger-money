import { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "../../lib/axios";

interface Transactions {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface CreateTransactionImput {
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome'
}

interface TransactionContextType {
    transactions: Transactions[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransaction: (data: CreateTransactionImput) => Promise<void>;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext =  createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
        const [transactions, setTransactions] = useState<Transactions[]>([])

        async function fetchTransactions(query?: string) {
           const response = await api.get('/transactions', {
              params: {
                 _sort: 'createdAt',
                 _order: 'desc',
                 q: query,
              }
           })
           
            // const url = new URL('/transactions');

            // if (query) {
            //     url.searchParams.append('q', query);
            // }
            
            // const response = await fetch(url);
            // const data = await response.json();

            setTransactions(response.data);
        }

        async function createTransaction(data: CreateTransactionImput) {
            const { description, category, price, type } = data;
            
            const response = await api.post('transactions', {
                description ,
                category,
                price,
                type,
                createdAt: new Date(),
            })
    
            setTransactions(state => [response.data, ...state,]);
        }

        useEffect(() => {

            fetchTransactions();
        
        }, [])

    return (
        <TransactionsContext.Provider value={{ 
            transactions,
            fetchTransactions,
            createTransaction,
           }}>
            {children}
        </TransactionsContext.Provider>
    )
}