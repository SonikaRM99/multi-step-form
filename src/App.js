import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MultiStepForm from "./MultiStepForm";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MultiStepForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
