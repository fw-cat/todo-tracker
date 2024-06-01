import * as React from "react"
import BaseLayout from "../components/Layout/Base"

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const TopPage = () => {
  return (
    <BaseLayout>
      <h1>TopPage</h1>
    </BaseLayout>
  )
}

export default TopPage

export const Head = () => <title>Todo Tracker</title>
