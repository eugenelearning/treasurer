package io.treasurer.data.currency;

import io.treasurer.data.AbstractEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Getter
@Table(name = "currencies")
public class Currency extends AbstractEntity {
    private String value;
}
