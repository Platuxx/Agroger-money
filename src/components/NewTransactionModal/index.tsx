import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { Overlay, Content, CloseButton, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleUp, ArrowCircleDown } from "phosphor-react";
import * as z from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';


const newTransactionFormSchema = z.object({
   description: z.string(),
   price: z.number(),
   category: z.string(),
   // type: z.enum(['income', 'outcome']),
})

type NewTransactionFormImputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {

  const { 
   register, 
   handleSubmit,
   formState: { isSubmitting }
 } =  useForm<NewTransactionFormImputs>({
      resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransactions(data: NewTransactionFormImputs) {
      await new Promise(resolve => setTimeout(resolve, 2000))
    
   
      console.log(data);
  }

  return (
        <Dialog.Portal>
          <Overlay />

           <Content>
                  <Dialog.Title>Nova transação</Dialog.Title>

                  <CloseButton>
                     <X size={24}/>
                  </CloseButton>

                  <form onSubmit={handleSubmit(handleCreateNewTransactions)}>
                     <input 
                        type="text" 
                        placeholder='Descrição' 
                        required 
                        {...register('description')}
                     />
                     <input 
                        type="number" 
                        placeholder='Preço' 
                        required 
                        {...register('price', { valueAsNumber: true})}
                     />
                     <input 
                        type="text" 
                        placeholder='Categotoria' 
                        required 
                        {...register('category')}
                     />

                     <TransactionType>
                        <TransactionTypeButton variant="income" value="income">
                          <ArrowCircleUp size={24} />
                            Entrada
                        </TransactionTypeButton>

                        <TransactionTypeButton variant="outcome" value="outcome">
                          <ArrowCircleDown size={24} />
                           Saída
                        </TransactionTypeButton>
                     </TransactionType>

                     <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                     </button>                       
                  </form>

                  
           </Content>
       </Dialog.Portal>
    )
}