package io.treasurer.data.flow;

import io.treasurer.data.flow.dto.ExpenseFlowCategoryCurrencySum;
import io.treasurer.data.flow.dto.ExpenseFlowCategorySum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ExpenseFlowRepository extends JpaRepository<ExpenseFlow, UUID>, JpaSpecificationExecutor<ExpenseFlow> {
    @Query("select e from ExpenseFlow e where wallet_id = ?1")
    List<ExpenseFlow> findAllByWalletId(UUID walletId);

    @Query("select coalesce(sum(e.amount), 0) from ExpenseFlow e where wallet_id = ?1")
    int totalByWalletId(UUID walletId);

    @Query(value = "select " +
            "new io.treasurer.data.flow.dto.ExpenseFlowCategoryCurrencySum(e.category_id, w.currency_id, sum(e.amount)) " +
            "from ExpenseFlow e join Wallet w on w.id = e.wallet_id " +
            "where e.wallet_id in (select id from Wallet w where user_id = ?1) " +
            "group by e.category_id, w.currency_id")
    List<ExpenseFlowCategoryCurrencySum> totalByUserIdByCategories(UUID walletId);

    @Query(value = "select new io.treasurer.data.flow.dto.ExpenseFlowCategorySum(category_id, sum(e.amount)) " +
            "from ExpenseFlow e " +
            "where wallet_id = ?1 " +
            "group by e.category_id")
    List<ExpenseFlowCategorySum> totalByWalletIdByCategories(UUID walletId);
}
