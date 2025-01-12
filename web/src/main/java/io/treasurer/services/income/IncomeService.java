package io.treasurer.services.income;

import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;
import io.treasurer.data.flow.IncomeFlow;
import io.treasurer.data.flow.IncomeFlowRepository;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@BrowserCallable
@Service
@RolesAllowed("USER")
public class IncomeService extends CrudRepositoryService<IncomeFlow, UUID, IncomeFlowRepository> {

    private final IncomeFlowRepository repository;

    public IncomeService(IncomeFlowRepository repository) {
        this.repository = repository;
    }

    public List<IncomeFlow> listAllByWallet(UUID walletId) {
        return this.repository.findAllByWalletId(walletId);
    }

    public int totalByWallet(UUID walletId) {
        return this.repository.totalByWalletId(walletId);
    }
}
