import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";

function createMigrationOptions(dbClient) {
  return {
    dbClient,
    dryRun: true,
    dir: resolve("infra", "migrations"),
    direction: "up",
    log: () => {},
    migrationsTable: "pgmigrations",
  };
}

async function listPendingMigrations() {
  const pendingMigrations = await database.withClient(async (dbClient) => {
    return migrationRunner(createMigrationOptions(dbClient));
  });

  return pendingMigrations;
}

async function runPendingMigrations() {
  const migratedMigrations = await database.withClient(async (dbClient) => {
    return migrationRunner({
      ...createMigrationOptions(dbClient),
      dryRun: false,
    });
  });

  return migratedMigrations;
}

const migrator = {
  listPendingMigrations,
  runPendingMigrations,
};

export default migrator;
