import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { WalletList } from 'Frontend/components/WalletList/WalletList';
import WalletsController from 'Frontend/controllers/WalletsController';
import st from './wallet.module.css';

export const config: ViewConfig = {
  menu: { order: 5, icon: 'line-awesome/svg/wallet-solid.svg' },
  title: 'Wallets',
  loginRequired: true,
};

export default function WalletsView() {
    return (
        <div className={st.layout}>
            <WalletsController>
                {({data, onCreate, onRemove}) => (
                    <WalletList onCreate={onCreate} onRemove={onRemove} items={data.wallets}/>
                )}
            </WalletsController>
        </div>
    );
}
