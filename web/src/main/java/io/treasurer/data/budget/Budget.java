package io.treasurer.data.budget;

import io.treasurer.data.AbstractEntity;
import io.treasurer.data.category.ExpenseCategory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "budgets")
public class Budget extends AbstractEntity {
    private String name;
    private int amount;
    private UUID wallet_id;
    private UUID category_id;

    @Column(insertable = false, updatable = false)
    private Date created;

    @OneToOne()
    @JoinColumn(insertable = false, updatable = false, name = "category_id", referencedColumnName = "id")
    private ExpenseCategory category;
}
