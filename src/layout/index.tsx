import Header from "@/layout/header";
import {Outlet} from "react-router-dom";

const Index = () => {
  return (
      <div className="flex flex-col min-h-0">
        <Header/>
        <div className="flex-1 py-4 mt-10 md:p-5 pb-5">
          <Outlet/>
        </div>
      </div>
  )
}
export default Index
