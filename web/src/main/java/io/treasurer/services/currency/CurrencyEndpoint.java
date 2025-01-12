package io.treasurer.services.currency;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import io.treasurer.data.currency.Currency;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class CurrencyEndpoint {

    @Autowired
    private CurrencyService service;

    public List<Currency> getCurrencies() {
        return this.service.getAll();
    }
}
