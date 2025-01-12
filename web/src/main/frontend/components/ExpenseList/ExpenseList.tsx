import { VerticalLayout, VirtualList } from '@vaadin/react-components';
import ExpenseFlow from 'Frontend/generated/io/treasurer/data/flow/ExpenseFlow';
import IncomeFlow from 'Frontend/generated/io/treasurer/data/flow/IncomeFlow';
import Wallet from 'Frontend/generated/io/treasurer/data/wallet/Wallet';
import { formatAmount } from 'Frontend/util/currency';
import ExpenseCategory from 'Frontend/generated/io/treasurer/data/category/ExpenseCategory';
import { AddRecord } from './components/AddRecord/AddRecord';
import st from './expenseList.module.css';

type ExpenseListProps = {
    wallet: Wallet | undefined;
    items: (ExpenseFlow | IncomeFlow)[];
    categories: ExpenseCategory[];
    onCreate: (item: IncomeFlow) => void;
};

export function ExpenseList(props: ExpenseListProps) {
    function renderItem({ item } : {item: ExpenseFlow}) {
        const category = props.categories.find(category => category.id === item.category_id);

        return <div className={st.item}>
            <div className={st.title}>
                {item.title}
            </div>

            <div className={st.category}>
                {category?.title}
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
                    {renderAddControl('Add expense record')}
                    <VirtualList items={props.items}>{renderItem}</VirtualList>
                </VerticalLayout>
            )
            : (
                <div className={st.placeholder}>
                    <h2>No records yet</h2>
                    <p>Continue using wallet and record your income and expenses</p>
                    {renderAddControl('Add first expense')}
                </div>
            )
    )
};
