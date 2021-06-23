import "./App.css";
import Footer from "./components/Footer";

import { Container } from "@material-ui/core";
import { useRoutes } from "react-router-dom";

import routes from "./routes";

function App() {
  const routing = useRoutes(routes);

  return (
    <div className="App">
      <Container maxWidth="md">{routing}</Container>
      <Footer />
    </div>
  );
}

export default App;
