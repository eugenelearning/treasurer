package io.treasurer.data.flow.dto;

import java.util.UUID;

public record ExpenseFlowCategorySum(UUID category_id, long total) {
}