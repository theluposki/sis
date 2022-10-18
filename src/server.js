import app from "./app.js"

import { DateFormat } from "./Util.js";

const server = app.listen(3000).once("listening", () => {
  console.log(`Server started in http://localhost:3000 process: ${process.pid}`);
});
// aguardar as conexoes serem encerradas para só então encerrar o programa.
process.on("SIGTERM", () => {
  console.log(`>>>> end - ${process.pid} - ${DateFormat()} \n\n`);
  server.close(() => process.exit());
});
