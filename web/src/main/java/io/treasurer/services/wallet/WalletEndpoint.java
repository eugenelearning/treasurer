package io.treasurer.services.wallet;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import io.treasurer.data.wallet.Wallet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
public class WalletEndpoint {
    @Autowired
    private WalletService service;

    private void checkWalletOwnership(Optional<Wallet> wallet, UUID userId) {
        if (wallet.isPresent()) {
            if (!userId.equals(wallet.get().getUser_id())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Permission denied");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Wallet not found");
        }
    }

    public Wallet createUserWallet(UUID userId, String name, UUID currencyId) {
        Wallet w = new Wallet();

        w.setUser_id(userId);
        w.setName(name);
        w.setCurrency_id(currencyId);

        return this.service.save(w);
    }

    public Optional<Wallet> getWallet(UUID userId, UUID walletId) {
        try {
            Optional<Wallet> w = this.service.get(walletId);

            this.checkWalletOwnership(w, userId);

            return w;
        } catch (NullPointerException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Wallet not found");
        }
    }

    public void deleteWallet(UUID userId, UUID walletId) {
        Optional<Wallet> w = this.service.get(walletId);

        this.checkWalletOwnership(w, userId);

        this.service.delete(walletId);
    }
}
