import { VerticalLayout, VirtualList } from '@vaadin/react-components';
import ExpenseFlow from 'Frontend/generated/io/treasurer/data/flow/ExpenseFlow';
import IncomeFlow from 'Frontend/generated/io/treasurer/data/flow/IncomeFlow';
import Wallet from 'Frontend/generated/io/treasurer/data/wallet/Wallet';
import { formatAmount } from 'Frontend/util/currency';
import { AddRecord } from './components/AddRecord/AddRecord';
import IncomeCategory from 'Frontend/generated/io/treasurer/data/category/IncomeCategory';
import st from './incomeList.module.css';

type IncomeListProps = {
    wallet: Wallet | undefined;
    items: (ExpenseFlow | IncomeFlow)[];
    categories: IncomeCategory[];
    onCreate: (item: IncomeFlow) => void;
};

export function IncomeList(props: IncomeListProps) {
    function renderItem({ item } : {item: ExpenseFlow}) {
        return <div className={st.item}>
            <div className={st.title}>
                {item.title}
            </div>
    
            <div className={st.amount}>
                {formatAmount(item.amount, props.wallet?.currency)}
            </div>
    
            <div className={st.date}>
                {(new Date(String(item.created))).toLocaleDateString('ru-RU')}
            </div>
        </div>
    };

    function renderAddControl(buttonText: string) {
        return (
            <AddRecord
                buttonText={buttonText}
                walletId={props.wallet?.id}
                onCreate={props.onCreate}
                categories={props.categories}
            />
        )
    };

    return (
        props.items.length
            ? (
                <VerticalLayout theme='spacing'>
                    {renderAddControl('Add income record')}
                    <VirtualList items={props.items}>{renderItem}</VirtualList>
                </VerticalLayout>
            )
            : (
                <div className={st.placeholder}>
                    <h2>No records yet</h2>
                    <p>Continue using wallet and record your income and expenses</p>
                    {renderAddControl('Add first income')}
                </div>
            )
    )
};
