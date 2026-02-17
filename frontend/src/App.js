import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePoll from "./pages/CreatePoll";
import SessionPoll from "./pages/SessionPoll";

function App() {

return (

 <BrowserRouter>
 <Routes>
  <Route
      path="/"
      element={<CreatePoll />}
       />
  <Route
     path="/poll/:pollId"
     element={<SessionPoll/>}
     />
  </Routes>
</BrowserRouter>
);
}

export default App;
