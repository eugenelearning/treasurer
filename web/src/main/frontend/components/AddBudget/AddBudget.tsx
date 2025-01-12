import { useCallback, useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button, ComboBox, Dialog, HorizontalLayout, Icon, NumberField, SelectItem, TextField, VerticalLayout } from '@vaadin/react-components';
import { BudgetEndpoint, ExpenseCategoryEndpoint } from 'Frontend/generated/endpoints';
import ExpenseCategory from 'Frontend/generated/io/treasurer/data/category/ExpenseCategory';
import Budget from 'Frontend/generated/io/treasurer/data/budget/Budget';
import st from './addBudget.module.css'

type AddFlowProps = {
    walletId: string | undefined;
    buttonText?: string;
    onCreate: (item: Budget) => void
};

export default function AddBudget(props: AddFlowProps) {
    const dialogOpened = useSignal<boolean>(false);

    const categoriesOptions = useSignal<SelectItem[]>([]);

    const label = useSignal<string | undefined>();
    const integer = useSignal<number | undefined>();
    const fraction = useSignal<number | undefined>();
    const categoryId = useSignal<string | undefined>();

    const close = useCallback(() => {
        label.value = undefined;
        integer.value = undefined;
        fraction.value = undefined;
        categoryId.value = undefined;

        dialogOpened.value = false;
    }, []);

    function categoriesToOptions(categories: ExpenseCategory[]) {
        return (categories || []).map(item => ({
          label: item.title,
          value: item.id
        }))
    }
  
    const submit = useCallback(() => {
        const amount = (integer?.value || 0) * 100 + (fraction.value || 0);
        const category = categoryId.value;
        const title = label.value;
        const walletId = props.walletId;
    
        if (walletId && category && title) {
            BudgetEndpoint.create(walletId, category, title, amount).then(data => {
                if (data) {
                    props.onCreate(data);
                }
           })
        }
    }, [props.walletId, props.onCreate]);

    useEffect(() => {
        ExpenseCategoryEndpoint.getAll().then(p => { 
            if (p) {
                categoriesOptions.value = categoriesToOptions(p.filter(item => !!item))
            }
        })
        categoryId.value = categoriesOptions.value[0]?.value;
    }, []);

    return (
        <>
            <Dialog
                headerTitle='Create category budget'
                opened={dialogOpened.value}
                onOpenedChanged={({ detail }) => {
                    dialogOpened.value = detail.value;
                }}
                footerRenderer={() => (
                    <>
                        <Button onClick={close}>
                            Cancel
                        </Button>
                        <Button
                            theme='primary'
                            onClick={submit}
                        >
                            Add
                        </Button>
                    </>
                )}
                >
                <VerticalLayout className={st.layout}>
                    <TextField
                        required
                        label='Title'
                        errorMessage='Title required'
                        value={label.value}
                        onChange={e => label.value = e.target.value.trim()}
                    />

                    <ComboBox
                        required
                        label='Category'
                        errorMessage='Category required'
                        items={categoriesOptions.value}
                        value={categoryId.value}
                        onChange={e => categoryId.value = e.target.value}
                    />

                    <HorizontalLayout className={st.amount}>
                        <NumberField
                            required
                            label='Amount'
                            theme='align-right'
                            className={st.integer}
                            placeholder='0'
                            min={0}
                            value={String(integer.value)}
                            onChange={e => {
                                const value = parseInt(e.target.value);

                                if (value < 0) {
                                    integer.value = 0;
                                } else {
                                    integer.value = value;
                                }
                            }}
                        />
                        <div className={st.separator}>.</div>
                        <NumberField
                            theme='align-right'
                            className={st.fraction}
                            placeholder='00'
                            value={String(fraction.value)}
                            onChange={e => {
                                const value = parseInt(e.target.value);

                                if (value < 0) {
                                    fraction.value = 0;
                                } else if (value > 99) {
                                    fraction.value = 99;
                                } else {
                                    fraction.value = value;
                                }
                            }}
                        />
                    </HorizontalLayout>
                </VerticalLayout>
            </Dialog>

            <Button onClick={() => dialogOpened.value = true} theme={props.buttonText ? undefined : 'icon small'}>
                {props.buttonText || <Icon icon='lumo:plus' />}
            </Button>
        </>
    )
}