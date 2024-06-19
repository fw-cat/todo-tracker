import * as React from "react"
import {user} from "../utils/auth"

const IndexPage = () => {
  console.log("user is ", user())

  return (
    <main>
      <h1>access { user().id }</h1>
    </main>
  )
}

export default IndexPage
