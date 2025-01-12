package io.treasurer.services.expense;

import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;
import io.treasurer.data.flow.ExpenseFlow;
import io.treasurer.data.flow.ExpenseFlowRepository;
import io.treasurer.data.flow.dto.ExpenseFlowCategoryCurrencySum;
import io.treasurer.data.flow.dto.ExpenseFlowCategorySum;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@BrowserCallable
@Service
@RolesAllowed("USER")
public class ExpenseService extends CrudRepositoryService<ExpenseFlow, UUID, ExpenseFlowRepository> {
    private final ExpenseFlowRepository repository;

    public ExpenseService(ExpenseFlowRepository repository) {
        this.repository = repository;
    }

    public List<ExpenseFlow> listAllByWallet(UUID walletId) {
        return this.repository.findAllByWalletId(walletId);
    }

    public int totalByWallet(UUID walletId) {
        return this.repository.totalByWalletId(walletId);
    }

    public List<ExpenseFlowCategoryCurrencySum> totalByUser(UUID userId) {
        return this.repository.totalByUserIdByCategories(userId);
    }

    public List<ExpenseFlowCategorySum> totalByWalletByCategories(UUID walletId) {
        return this.repository.totalByWalletIdByCategories(walletId);
    }
}
