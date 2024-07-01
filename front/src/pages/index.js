import * as React from "react"
import axiosInstance from "../utils/api"

// trackerの取得
const getTracker = async () => {
  let result = await axiosInstance.get("/tracker");
  console.log(result)
  return result ? result.data.tracker : []
}

const IndexPage = () => {
  let trackers = getTracker()
  console.log(trackers)

  return (
    <main>
      <h1>access</h1>
    </main>
  )
}

export default IndexPage
