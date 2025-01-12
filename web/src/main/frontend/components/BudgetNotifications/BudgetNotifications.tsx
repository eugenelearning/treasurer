import { HorizontalLayout, Notification } from '@vaadin/react-components';
import Budget from 'Frontend/generated/io/treasurer/data/budget/Budget';
import ExpenseCategory from 'Frontend/generated/io/treasurer/data/category/ExpenseCategory';
import ExpenseFlowCategorySum from 'Frontend/generated/io/treasurer/data/flow/dto/ExpenseFlowCategorySum';
import Wallet from 'Frontend/generated/io/treasurer/data/wallet/Wallet';
import { formatAmount } from 'Frontend/util/currency';

type BudgetNotificationsProps = {
    wallet: Wallet | undefined;
    budgets: Budget[];
    categories: ExpenseCategory[];
    totals: ExpenseFlowCategorySum[]; 
};

export function BudgetNotifications(props: BudgetNotificationsProps) {
    return (
        <>
            {props.budgets.map(budget => {
                const limit = props.totals.find(item => item.category_id === budget.category_id);
                const category = props.categories.find(item => item.id === budget.category_id);
                const total = limit?.total ?? 0;

                if (total > budget.amount && category) {
                    return (
                        <Notification
                            key={budget.category_id}
                            theme='warning'
                            duration={0}
                            position='top-end'
                            opened
                        >
                            <HorizontalLayout theme='spacing' style={{ alignItems: 'center' }}>
                                Run over {category.title} category budget by {formatAmount(total - budget.amount, props.wallet?.currency)}
                            </HorizontalLayout>
                        </Notification>
                    )
                }

                return null;
            })}
        </>
    )
}
