import {ViewConfig} from '@vaadin/hilla-file-router/types.js';
import {HorizontalLayout, TabSheet, TabSheetTab} from '@vaadin/react-components';
import WalletController from 'Frontend/controllers/WalletController';
import { formatAmount } from 'Frontend/util/currency';
import { IncomeList } from 'Frontend/components/IncomeList/IncomeList';
import { BudgetList } from 'Frontend/components/BudgetList/BudgetList';
import { ExpenseList } from 'Frontend/components/ExpenseList/ExpenseList';
import { BudgetNotifications } from 'Frontend/components/BudgetNotifications/BudgetNotifications';
import st from './wallet.module.css';

export const config: ViewConfig = {
  loginRequired: true,
};

export default function WalletView() {
    return (
        <WalletController>
            {({
                error,
                pending,
                data,
                refetch
            }) => {
                if (pending) {
                    return null;
                }

                if (error) {
                    return (
                        <div className={st.placeholder}>
                            <h2>Something went wrong :(</h2>
                            <p>Check wallet id or try to reload page</p>
                        </div>
                    )
                }

                const ballance = data.totals.income - data.totals.expense;

                return (
                    <>
                        <HorizontalLayout theme="padding spacing">
                            <div className={st.title}>
                                <h2>{data.wallet?.name}</h2>
                                <span {...{ theme: ballance == 0 ? 'badge' : ballance < 0 ? 'badge error' : 'badge success' }}>
                                    {formatAmount(ballance, data.wallet?.currency)}
                                </span>
                            </div>
                        </HorizontalLayout>

                        <TabSheet>
                            <TabSheetTab label='Expenses'>
                                <ExpenseList
                                    items={data.flows.expenses}
                                    categories={data.categories.expense}
                                    wallet={data.wallet}
                                    onCreate={refetch.flows}
                                />
                            </TabSheetTab>

                            <TabSheetTab label='Incomes'>
                                <IncomeList
                                    items={data.flows.incomes}
                                    categories={data.categories.income}
                                    wallet={data.wallet}
                                    onCreate={refetch.flows}
                                />
                            </TabSheetTab>

                            <TabSheetTab label='Budgets'>
                                <BudgetList
                                    items={data.budgets}
                                    wallet={data.wallet}
                                    onCreate={refetch.wallet}
                                />
                            </TabSheetTab>
                        </TabSheet>

                        <BudgetNotifications
                            wallet={data.wallet}
                            budgets={data.budgets}
                            categories={data.categories.expense}
                            totals={data.totals.byCategory}
                        />
                    </>
                )
            }}
        </WalletController>
    );
}
