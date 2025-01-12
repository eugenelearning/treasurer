import { Button, Icon, VerticalLayout, VirtualList } from '@vaadin/react-components';
import Wallet from 'Frontend/generated/io/treasurer/data/wallet/Wallet';
import AddWallet from '../AddWallet/AddWallet';
import { NavLink } from 'react-router-dom';
import { WalletEndpoint } from 'Frontend/generated/endpoints';
import { useAuth } from 'Frontend/util/auth';
import st from './walletList.module.css'

type WalletListProps = {
    items: Wallet[];
    onCreate: (item: Wallet) => void;
    onRemove: (itemId: string) => void;
};

export function WalletList(props: WalletListProps) {
    const {state} = useAuth();

    function renderItem({ item } : {item: Wallet}) {
        return <div className={st.item}>
            <div className={st.title}>
                <NavLink to={`/wallets/${item.id}/`}>{item.name}</NavLink>
            </div>
            <div className={st.actions}>
                <Button theme={'icon small'} onClick={() => {
                    WalletEndpoint.deleteWallet(state.user?.id, item.id).then(() => props.onRemove(String(item.id)))
                }}>
                    <Icon icon='vaadin:close-small' />
                </Button>
            </div>
        </div>
    };

    return (
        props.items.length
            ? (
                <VerticalLayout theme='spacing'>
                    <AddWallet buttonText='Add wallet' onCreate={props.onCreate}/>
                    <VirtualList items={props.items}>{renderItem}</VirtualList>
                </VerticalLayout>
            )
            : (
                <div className={st.placeholder}>
                    <h2>No limits set</h2>
                    <p>Add budget categories to control expenses</p>

                    <AddWallet buttonText='Create first wallet' onCreate={props.onCreate}/>
                </div>
            )
    )
}
