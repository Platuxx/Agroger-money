import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../contexts/TransactionsContext";



const searchFormSchema = z.object({
  query: z.string(),
})

type searchFormImputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
    const fetchTransactions = useContextSelector(
        TransactionsContext,
        (context) => {
          return context.fetchTransactions
    }) 

   
    const {
       register, 
       handleSubmit,
       formState: {
          isSubmitting
       }
      } = useForm<searchFormImputs>({
       resolver: zodResolver(searchFormSchema),
    })

   async function handleSearchTransactions(data: searchFormImputs) {
         await fetchTransactions(data.query)
     
      //  await new Promise(resolve => setTimeout(resolve, 2000))
    
      //  console.log(data)
    }

    return (
       <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
         <input 
            type="text" 
            placeholder="Busque por transações" 
            {...register('query')}
          />

          
         <button type="submit" disabled={isSubmitting}>
           <MagnifyingGlass size={20}/>
           
            Buscar
         </button>
       </SearchFormContainer>
    )
}
