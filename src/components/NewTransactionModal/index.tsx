import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { Overlay, Content, CloseButton, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleUp, ArrowCircleDown } from "phosphor-react";
import * as z from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller } from 'react-hook-form';
import { useContext } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext';


const newTransactionFormSchema = z.object({
   description: z.string(),
   price: z.number(),
   category: z.string(),
   type: z.enum(['income', 'outcome']),
})

type NewTransactionFormImputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
   const { createTransaction } = useContext(TransactionsContext)

   const { 
      control,
      register, 
      handleSubmit,
      formState: { isSubmitting },
      reset,
   } =  useForm<NewTransactionFormImputs>({
         resolver: zodResolver(newTransactionFormSchema),
         defaultValues: {
            type: 'income'
         }
   })

  async function handleCreateNewTransactions(data: NewTransactionFormImputs) {
     
      const { description, category, price, type } = data;
      
      await createTransaction({
         description,
         price,
         category,
         type,
      })

      //    const response = await api.post('transactions', {
      //       description ,
      //       category,
      //       price,
      //       type,
      //       createdAt: new Date(),
      //   })

   
      // console.log(response.data);

      reset();
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

                     <Controller
                       control={control}
                       name='type'
                       render={({ field }) => {
                           return (
                          <TransactionType 
                             onValueChange={field.onChange} 
                             value={field.value}
                          >
                              <TransactionTypeButton variant="income" value="income">
                                 <ArrowCircleUp size={24} />
                                 Entrada
                              </TransactionTypeButton>

                              <TransactionTypeButton variant="outcome" value="outcome">
                                 <ArrowCircleDown size={24} />
                                 Saída
                              </TransactionTypeButton>
                           </TransactionType>
                          )  
                       }}
                     />

                    

                     <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                     </button>                       
                  </form>

                  
           </Content>
       </Dialog.Portal>
    )
}