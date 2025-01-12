import AddFlow from 'Frontend/components/AddFlow/AddFlow';
import IncomeCategory from 'Frontend/generated/io/treasurer/data/category/IncomeCategory';
import IncomeFlow from 'Frontend/generated/io/treasurer/data/flow/IncomeFlow';
import { categoriesToOptions } from '../../utils';
import { IncomeEndpoint } from 'Frontend/generated/endpoints';

type AddRecordProps = {
    walletId: string | undefined;
    categories: IncomeCategory[];
    buttonText?: string;
    onCreate: (item: IncomeFlow) => void;
}

export function AddRecord(props: AddRecordProps) {
    return (
        <AddFlow<IncomeFlow, IncomeCategory>
            title='New income'
            walletId={props.walletId}
            categories={categoriesToOptions(props.categories)}
            create={IncomeEndpoint.create}
            buttonText={props.buttonText}
            onCreate={props.onCreate}
        />
    )
};
