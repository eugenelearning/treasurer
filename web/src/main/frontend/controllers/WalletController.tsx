import {ReactNode, useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {BudgetEndpoint, ExpenseCategoryEndpoint, ExpenseEndpoint, IncomeCategoryEndpoint, IncomeEndpoint, WalletEndpoint } from 'Frontend/generated/endpoints';
import ExpenseCategory from 'Frontend/generated/io/treasurer/data/category/ExpenseCategory';
import Wallet from 'Frontend/generated/io/treasurer/data/wallet/Wallet';
import {useAuth} from 'Frontend/util/auth';
import IncomeCategory from 'Frontend/generated/io/treasurer/data/category/IncomeCategory';
import Budget from 'Frontend/generated/io/treasurer/data/budget/Budget';
import ExpenseFlowCategorySum from 'Frontend/generated/io/treasurer/data/flow/dto/ExpenseFlowCategorySum';
import ExpenseFlow from 'Frontend/generated/io/treasurer/data/flow/ExpenseFlow';
import IncomeFlow from 'Frontend/generated/io/treasurer/data/flow/IncomeFlow';

type WalletControllerProps = {
    children: (payload: {
        error: boolean;
        pending: boolean;
        refetch: {
            wallet: () => Promise<void>;
            totals: () => Promise<void>;
            flows: () => Promise<void>;
            categories: () => Promise<void>;
        },
        data: {
            wallet: Wallet | undefined,
            budgets: Budget[];
            flows: {
                expenses: ExpenseFlow[];
                incomes: IncomeFlow[];
            };
            categories: {
                expense: ExpenseCategory[];
                income: IncomeCategory[];
            };
            totals: {
                byCategory: ExpenseFlowCategorySum[];
                income: number;
                expense: number;
            };
        }
    }) => ReactNode;
};

export default function WalletController(props: WalletControllerProps) {
    const {walletId} = useParams();
    const {state} = useAuth();
    const [wallet, setWallet] = useState<Wallet>();

    const [error, setError] = useState<boolean>(false);
    const [pending, setPending] = useState<boolean>(true);

    const [expenses, setExpenses] = useState<ExpenseFlow[]>([]);
    const [incomes, setIncomes] = useState<IncomeFlow[]>([]);

    const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);
    const [incomeCategories, setIncomeCategories] = useState<IncomeCategory[]>([]);

    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [totalExpenseByCategory, setTotalExpenseByCategory] = useState<ExpenseFlowCategorySum[]>([]);

    const [totalIncomes, setTotalIncomes] = useState<number>(0);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);

    const fetchWallet = useCallback(() => {
        return Promise
            .all([
                WalletEndpoint.getWallet(state.user?.id, walletId),
                BudgetEndpoint.getWalletBudgets(walletId),
            ])
            .then(([
                walletResp,
                budgetsResp,
            ]) => {
                setWallet(walletResp);
                setBudgets((budgetsResp || []).filter(p => !!p));
            })
    }, [walletId]);

    const fetchFlows = useCallback(() => {
        return Promise
            .all([
                ExpenseEndpoint.getWalletExpenses(walletId),
                IncomeEndpoint.getWalletIncomes(walletId),
            ])
            .then(([
                expensesResp,
                incomesResp,
            ]) => {
                setExpenses((expensesResp || []).filter(p => !!p));
                setIncomes((incomesResp || []).filter(p => !!p));
            })
    }, [walletId]);

    const fetchTotals = useCallback(() => {
        return Promise
            .all([
                ExpenseEndpoint.getTotalByCategories(walletId),
                ExpenseEndpoint.getTotal(walletId),
                IncomeEndpoint.getTotal(walletId),
            ])
            .then(([
                totalByCategoriesResp,
                totalExpensesResp,
                totalIncomesResp,
            ]) => {
                setTotalExpenses(totalExpensesResp);
                setTotalIncomes(totalIncomesResp);
                setTotalExpenseByCategory((totalByCategoriesResp || []).filter(p => !!p));
            })

    }, [walletId]);

    const fetchCategories = useCallback(() => {
        return Promise
            .all([
                ExpenseCategoryEndpoint.getAll(),
                IncomeCategoryEndpoint.getAll()
            ])
            .then(([
                expenseCategoriesResp,
                imcomeCategoriesResp
            ]) => {
                setExpenseCategories((expenseCategoriesResp || []).filter(item => !!item));
                setIncomeCategories((imcomeCategoriesResp || []).filter(item => !!item));
            })
    }, []);

    useEffect(() => {
        Promise
            .all([
                fetchWallet(),
                fetchFlows(),
                fetchTotals(),
                fetchCategories()
            ])
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setPending(false)
            })
    }, [walletId]);

    return (
        props.children({
            error,
            pending,
            refetch: {
                wallet: fetchWallet,
                flows: fetchFlows,
                totals: fetchTotals,
                categories: fetchCategories
            },
            data: {
                wallet,
                budgets,
                flows: {
                    incomes,
                    expenses,
                },
                categories: {
                    expense: expenseCategories,
                    income: incomeCategories
                },
                totals: {
                    byCategory: totalExpenseByCategory,
                    income: totalIncomes,
                    expense: totalExpenses,
                }
            }
        })
    );
}
