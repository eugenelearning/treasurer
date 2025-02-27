package io.treasurer.data.flow;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface IncomeFlowRepository extends JpaRepository<IncomeFlow, UUID>, JpaSpecificationExecutor<IncomeFlow> {
    @Query("select i from IncomeFlow i where wallet_id = ?1")
    List<IncomeFlow> findAllByWalletId(UUID walletId);

    @Query("select coalesce(sum(i.amount), 0) from IncomeFlow i where wallet_id = ?1")
    int totalByWalletId(UUID walletId);
}
