#!/usr/bin/env bash
# Apply every Prisma migration to a Turso database, in order.
#
# Prisma 6's `migrate deploy` can't drive the libSQL adapter, so we feed the
# raw migration SQL through the Turso shell instead. Safe to re-run: once a
# migration's tables exist the CREATE statements error and that file is skipped,
# but new migrations still apply. For a clean first deploy there are no errors.
#
# Usage:  ./scripts/turso-migrate.sh <turso-db-name>
# Needs:  turso CLI installed + logged in (`turso auth login`)
set -euo pipefail

DB="${1:-}"
if [ -z "$DB" ]; then
  echo "usage: $0 <turso-db-name>" >&2
  exit 1
fi

DIR="$(cd "$(dirname "$0")/.." && pwd)/prisma/migrations"

for d in "$DIR"/*/; do
  name="$(basename "$d")"
  [ -f "$d/migration.sql" ] || continue
  echo "→ applying $name"
  turso db shell "$DB" < "$d/migration.sql"
done

echo "✓ all migrations applied to $DB"
