package io.treasurer.services.income;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import io.treasurer.data.flow.IncomeFlow;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
public class IncomeEndpoint {

    @Autowired
    private IncomeService service;

    public int getTotal(UUID walletId) {
        return this.service.totalByWallet(walletId);
    }

    public List<IncomeFlow> getWalletIncomes(UUID walletId) {
        return this.service.listAllByWallet(walletId);
    }

    public IncomeFlow create(UUID walletId, UUID categoryId, String title, int amount) {
        IncomeFlow e = new IncomeFlow();

        e.setWallet_id(walletId);
        e.setAmount(amount);
        e.setTitle(title);
        e.setCategory_id(categoryId);

        return this.service.save(e);
    }
}
