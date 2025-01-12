package io.treasurer.services.expense;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import io.treasurer.data.flow.ExpenseFlow;
import io.treasurer.data.flow.dto.ExpenseFlowCategoryCurrencySum;
import io.treasurer.data.flow.dto.ExpenseFlowCategorySum;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
public class ExpenseEndpoint {

    @Autowired
    private ExpenseService service;

    public int getTotal(UUID walletId) {
        return this.service.totalByWallet(walletId);
    }

    public List<ExpenseFlowCategoryCurrencySum> getTotalByUser(UUID userId) {
        return this.service.totalByUser(userId);
    }

    public List<ExpenseFlowCategorySum> getTotalByCategories(UUID walletId) {
        return this.service.totalByWalletByCategories(walletId);
    }

    public List<ExpenseFlow> getWalletExpenses(UUID walletId) {
        return this.service.listAllByWallet(walletId);
    }

    public ExpenseFlow create(UUID walletId, UUID categoryId, String title, int amount) {
        ExpenseFlow e = new ExpenseFlow();

        e.setWallet_id(walletId);
        e.setAmount(amount);
        e.setTitle(title);
        e.setCategory_id(categoryId);

        return this.service.save(e);
    }
}
