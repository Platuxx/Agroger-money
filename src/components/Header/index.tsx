import { HeaderContainer } from "./styles"
import { HeaderContent } from "./styles"
import { NewTransactionModal } from "../NewTransactionModal"
import { NewTransactionButton } from "./styles"
import logoImg from "../../assets/logo.svg"
import * as Dialog from '@radix-ui/react-dialog'

export function Header() {
    return (
        <div>
          <HeaderContainer> 
             <HeaderContent>
                <img src={logoImg} alt="" />

               <Dialog.Root>
                   <Dialog.Trigger asChild>
                      <NewTransactionButton>Nova transação</NewTransactionButton>
                   </Dialog.Trigger>
               
                  <NewTransactionModal />
               </Dialog.Root> 
             </HeaderContent>
          </HeaderContainer>
        </div>
    )
}