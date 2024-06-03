import * as React from "react"
import BaseLayout from "../components/Layout/Base"

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const IndexPage = () => {
  return (
    <BaseLayout>
      <h1>Task Page</h1>
    </BaseLayout>
  )
}

export default IndexPage

export const Head = () => <title>Todo Tracker</title>
