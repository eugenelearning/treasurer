package io.treasurer.data.category;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "expense_categories")
public class ExpenseCategory extends BaseCategory {
}
