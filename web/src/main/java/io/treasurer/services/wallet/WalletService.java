package io.treasurer.services.wallet;

import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;
import io.treasurer.data.wallet.Wallet;
import io.treasurer.data.wallet.WalletRepository;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.stereotype.Service;

import java.util.UUID;

@BrowserCallable
@Service
@RolesAllowed("USER")
public class WalletService extends CrudRepositoryService<Wallet, UUID, WalletRepository> {

    private final WalletRepository repository;

    public WalletService(WalletRepository repository) {
        this.repository = repository;
    }
}
