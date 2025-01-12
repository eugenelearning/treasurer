#!/usr/bin/env bash

set -e

psql -v ON_ERROR_STOP=1 -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" <<-EOF
  CREATE TABLE budgets (
    id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        varchar(100) not null,
    amount      integer not null,
    wallet_id   uuid references wallets(id),
    category_id uuid not null references expense_categories(id),
    created     timestamp not null default current_timestamp
  );

  CREATE INDEX budgets_idx ON budgets (wallet_id, category_id);
EOF
