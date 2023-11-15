import { useState } from "react";
import { RxDatabase } from "rxdb";
import { Provider } from "rxdb-hooks";
import initializeDB from "../initializeDB";

const RXDBProvider = ({ children }: any) => {
  const [db, setDb] = useState<RxDatabase>();

  const init = () => {
    initializeDB()
      .then(setDb)
      .catch((errCode) => {
        if (errCode) {
          console.log(errCode);
        }
      });
  };

  if (!db) {
    init();
  }

  return <Provider db={db}>{children}</Provider>;
};

export default RXDBProvider;
