import { useEffect } from "react";
import { useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContainer, TransactionsTable, PriceHighlight  } from "./styles";
import { SearchForm } from "../../components/SearchForm";
import { TransactionsContext } from "../../components/contexts/TransactionsContext";
import { useContext } from "react";

// interface Transactions {
//     id: number;
//     description: string;
//     type: 'income' | 'outcome';
//     price: number;
//     category: string;
//     createdAt: string;
// }

export function Transactions() {
       
    const { transactions } = useContext(TransactionsContext);

//     const [transactions, setTransactions] = useState<Transactions>([])
//        async function loadTransactions() {
//        const response = await fetch("http://localhost:3000/transactions");
//        const data = await response.json();

//        setTransactions(data);
//     }
//      useEffect(() => {

//     loadTransactions();
    
//    }, [])
 
    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>

            <SearchForm />        
                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                            <tr key={transaction.id}>
                              <td width="50%">{transaction.description}</td>
                                <td>
                                <PriceHighlight variant={transaction.type}>
                                {transaction.price}
                                </PriceHighlight>
                                </td>
                                <td>{transaction.category}</td>
                                <td>{transaction.createdAt}</td>
                            </tr>
                            )
                        })}
                    
                       
                        {/* <tr>
                            <td width="50%">Hamburguer</td>
                            <td>
                            <PriceHighlight variant="outcome">
                                - R$ 59,00
                            </PriceHighlight>
                            </td>
                            <td>Alimentação</td>
                            <td>10/04/2022</td>
                        </tr> */}

                        {/* <tr>
                            <td width="50%">Aluguel do apartamento</td>
                            <td>- R$ 1.200,00</td>
                            <td>Casa</td>
                            <td>27/03/2022</td>
                        </tr> */}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}