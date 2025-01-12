package io.treasurer.services.budget;

import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;
import io.treasurer.data.budget.Budget;
import io.treasurer.data.budget.BudgetRepository;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@BrowserCallable
@Service
@RolesAllowed("USER")
public class BudgetService extends CrudRepositoryService<Budget, UUID, BudgetRepository> {
    private final BudgetRepository repository;

    public BudgetService(BudgetRepository repository) {
        this.repository = repository;
    }

    public List<Budget> listAllByWallet(UUID walletId) {
        return this.repository.findAllByWalletId(walletId);
    }
}
