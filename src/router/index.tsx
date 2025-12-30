import {Navigate, Route, Routes} from "react-router-dom";
import {HomeModule} from "@/modules";
import Layout from "@/layout";

const Index = () => {
  return (
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/*" element={<HomeModule/>}/>

          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Route>
      </Routes>
  )
}
export default Index
