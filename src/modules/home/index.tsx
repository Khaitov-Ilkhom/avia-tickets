import {Route, Routes} from "react-router-dom";
import View from "./pages/view"
import Trip from "./pages/trip"

const Index = () => {
  return (
      <Routes>
        <Route path="/" element={<View/>} />
        <Route path="/fly-results" element={<Trip/>} />
      </Routes>
  )
}
export default Index
