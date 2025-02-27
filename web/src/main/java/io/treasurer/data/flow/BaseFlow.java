package io.treasurer.data.flow;

import io.treasurer.data.AbstractEntity;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@MappedSuperclass
@Getter
@Setter
public class BaseFlow extends AbstractEntity {
    private int amount;
    private UUID category_id;
    private UUID wallet_id;
    private String title;

    @Column(insertable = false, updatable = false)
    private Date created;
}
