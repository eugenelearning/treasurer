package io.treasurer.data.wallet;

import io.treasurer.data.AbstractEntity;
import io.treasurer.data.budget.Budget;
import io.treasurer.data.currency.Currency;
import io.treasurer.data.flow.ExpenseFlow;
import io.treasurer.data.flow.IncomeFlow;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "wallets")
public class Wallet extends AbstractEntity {
    private String name;
    private UUID user_id;
    private UUID currency_id;

    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "wallet_id", updatable = false)
    @OrderBy("created ASC")
    private List<Budget> budgets;

    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "wallet_id", updatable = false)
    @OrderBy("created ASC")
    private List<ExpenseFlow> expenses;

    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "wallet_id", updatable = false)
    @OrderBy("created ASC")
    private List<IncomeFlow> incomes;

    @OneToOne()
    @JoinColumn(insertable = false, updatable = false, name = "currency_id", referencedColumnName = "id")
    private Currency currency;
}
