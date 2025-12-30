import React, {lazy} from 'react'
import SuspenseLoading from "@/components/ui/suspense-loading.tsx";

const Container = lazy(() => import("../../containers/trip"))
const Index = () => {
  return (
      <React.Suspense fallback={<SuspenseLoading/>}>
        <Container/>
      </React.Suspense>
  )
}
export default Index
