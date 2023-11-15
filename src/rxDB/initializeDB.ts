import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
import { RxDatabase, createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { taskSchema } from "./schema";

addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBMigrationPlugin);

const createDb = () =>
  createRxDatabase({
    name: "name",
    storage: getRxStorageDexie(),
    multiInstance: false,
    eventReduce: true,
    cleanupPolicy: {},
    ignoreDuplicate: true,
  });

const initializeDB = async () => {
  let databaseConnection: RxDatabase;
  try {
    databaseConnection = await createDb();
    await databaseConnection.addCollections({
      characters: {
        schema: taskSchema,
        migrationStrategies: {
          1: function (oldDoc) {
            oldDoc.time = new Date(oldDoc.time).getTime();
            return oldDoc;
          },
        },
      },
    });
  } catch (err: any) {
    console.error(err);
    return Promise.reject(err.code);
  }
  console.log(databaseConnection);
  return Promise.resolve(databaseConnection);
};

export default initializeDB;
