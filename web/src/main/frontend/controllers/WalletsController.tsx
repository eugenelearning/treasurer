import {ReactNode, useCallback, useEffect, useState} from 'react';
import {CurrencyEndpoint} from 'Frontend/generated/endpoints';
import Wallet from 'Frontend/generated/io/treasurer/data/wallet/Wallet';
import {useAuth} from 'Frontend/util/auth';
import Currency from 'Frontend/generated/io/treasurer/data/currency/Currency';

type WalletsControllerProps = {
    children: (payload: {
        error: boolean;
        pending: boolean;
        onCreate: (item: Wallet) => void;
        onRemove: (itemId: string) => void;
        data: {
            currencies: Currency[],
            wallets: Wallet[];
        }
    }) => ReactNode;
};

export default function WalletsController(props: WalletsControllerProps) {
    const {state} = useAuth();
    const [error, setError] = useState<boolean>(false);
    const [pending, setPending] = useState<boolean>(true);

    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [wallets, setWallets] = useState<Wallet[]>(state?.user?.wallets?.filter?.(item => !!item) || []);

    const fetchCurrencies = useCallback(async () => {
        const data = await CurrencyEndpoint.getCurrencies();

        setCurrencies((data || []).filter(p => !!p));
    }, []);

    useEffect(() => {
        fetchCurrencies()
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
            onRemove: id => {
                setWallets(wallets.filter(item => item.id !== id));
            },
            onCreate: item => {
                setWallets([
                    ...wallets,
                    item
                ]);
            },
            data: {
                currencies,
                wallets
            }
        })
    );
}
