import * as React from "react"
import api from "../utils/api"

// trackerの取得
const getTracker = async () => {
  let result = await api.get("/tracker");
  console.log(result)
  return result ? result.data.tracker : []
}

const IndexPage = () => {
  let trackers = getTracker()

  return (
    <main>
      <h1>access</h1>
    </main>
  )
}

export default IndexPage
