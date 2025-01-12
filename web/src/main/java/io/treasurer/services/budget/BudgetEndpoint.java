package io.treasurer.services.budget;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import io.treasurer.data.budget.Budget;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
public class BudgetEndpoint {
    @Autowired
    private BudgetService service;

    public List<Budget> getWalletBudgets(UUID walletId) {
        return this.service.listAllByWallet(walletId);
    }

    public Budget create(UUID walletId, UUID categoryId, String name, int amount) {
        Budget e = new Budget();

        e.setWallet_id(walletId);
        e.setAmount(amount);
        e.setName(name);
        e.setCategory_id(categoryId);

        return this.service.save(e);
    }
}
