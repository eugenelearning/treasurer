import { VerticalLayout, VirtualList } from '@vaadin/react-components';
import Wallet from 'Frontend/generated/io/treasurer/data/wallet/Wallet';
import { formatAmount } from 'Frontend/util/currency';
import Budget from 'Frontend/generated/io/treasurer/data/budget/Budget';
import AddBudget from '../AddBudget/AddBudget';
import st from './budgetList.module.css';

type BudgetListProps = {
    wallet: Wallet | undefined;
    items: Budget[];
    onCreate: (item: Budget) => void;
};

export function BudgetList(props: BudgetListProps) {
    function renderFlowItem({ item } : {item: Budget}) {
        return <div className={st.item}>
            <div className={st.title}>
                {item.name}
            </div>
    
            <div className={st.amount}>
                {formatAmount(item.amount, props.wallet?.currency)}
            </div>
    
            <div className={st.date}>
                {(new Date(String(item.created))).toLocaleDateString('ru-RU')}
            </div>
        </div>
    };

    return (
        props.items.length
            ? (
                <VerticalLayout theme='spacing'>
                    <AddBudget onCreate={props.onCreate} walletId={props.wallet?.id} buttonText='Add bugget limit'/>
                    <VirtualList items={props.items}>{renderFlowItem}</VirtualList>
                </VerticalLayout>
            )
            : (
                <div className={st.placeholder}>
                    <h2>No limits set</h2>
                    <p>Add budget categories to control expenses</p>

                    <AddBudget onCreate={props.onCreate} walletId={props.wallet?.id}  buttonText='Add first group limit'/>
                </div>
            )
    )
}
