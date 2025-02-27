import {ReactNode, useCallback, useEffect, useState} from 'react';
import {CurrencyEndpoint, ExpenseCategoryEndpoint, ExpenseEndpoint} from 'Frontend/generated/endpoints';
import ExpenseCategory from 'Frontend/generated/io/treasurer/data/category/ExpenseCategory';
import Wallet from 'Frontend/generated/io/treasurer/data/wallet/Wallet';
import {useAuth} from 'Frontend/util/auth';
import Currency from 'Frontend/generated/io/treasurer/data/currency/Currency';

type ExpenseGroups = Record<string, {currency_id: string, total: number}[]>;

type DashboardControllerProps = {
    children: (payload: {
        error: boolean;
        pending: boolean;
        data: {
            currencies: Currency[],
            expenseCategories: ExpenseCategory[],
            expenseGroups: ExpenseGroups;
            wallets: Wallet[];
        }
    }) => ReactNode;
};

export default function DashboardController(props: DashboardControllerProps) {
    const {state} = useAuth();
    const [error, setError] = useState<boolean>(false);
    const [pending, setPending] = useState<boolean>(true);
    const [expenseGroups, setExpenseGroups] = useState<ExpenseGroups>({});
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);

    const fetchCurrencies = useCallback(async () => {
        const data = await CurrencyEndpoint.getCurrencies();

        setCurrencies((data || []).filter(p => !!p));
    }, []);

    const fetchCategories = useCallback(async () => {
        const expenseCategoriesResp = await ExpenseCategoryEndpoint.getAll();
    
        setExpenseCategories((expenseCategoriesResp || []).filter(item => !!item));
    }, []);
   
    const fetchSummary = useCallback(async () => {
        const data = await ExpenseEndpoint.getTotalByUser(state.user?.id);

        setExpenseGroups((data || []).reduce<ExpenseGroups>((acc, item) => {
            if (item?.category_id && item.currency_id) {
                acc[item?.category_id] = acc[item?.category_id] || [];

                acc[item?.category_id].push({
                    currency_id: item.currency_id,
                    total: item.total
                });
            }

            return acc;
        }, {}));
    }, []);

    useEffect(() => {
        Promise
            .all([
                fetchSummary(),
                fetchCurrencies(),
                fetchCategories(),
            ])
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setPending(false)
            })
    }, []);

    return (
        props.children({
            error,
            pending,
            data: {
                currencies,
                expenseCategories,
                expenseGroups,
                wallets: state?.user?.wallets?.filter?.(item => !!item) || []
            }
        })
    );
}
