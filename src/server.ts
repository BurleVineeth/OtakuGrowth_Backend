import app from "./app";
import { config } from "./core/config/env";
import { connectDB } from "./core/config/db"

const PORT = config.PORT;
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
