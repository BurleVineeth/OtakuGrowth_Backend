import app from "./app";
import { config } from "./core/config/env";

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
