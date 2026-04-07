const App = require("./src/app");
const { default: connectDB } = require("./src/database/db");


App.listen(3000, () => {
  console.log('Server is running on port 3000');
});

connectDB();