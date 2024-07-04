import React, { useEffect, useState } from "react"
import axiosInstance from "../utils/api"
import Tracker from "../components/Parts/Tracker"
import BaseLayout from "../components/Layout/Base"

const IndexPage = () => {
  const [trackers, setTrackers] = useState([]);

  useEffect(() => {
    const fetchTrackers = async () => {
      try {
        const response = await axiosInstance.get('/tracker');
        setTrackers(response.data.trackers);

      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTrackers();
  }, []);

  return (
    <BaseLayout>
      <main>
        <h1>access</h1>
        <ul>
          {trackers.map(tracker => {
            return (
              <Tracker key={tracker.id} tracker={tracker}></Tracker>
            )
          })}
          <li>
            <a href="/create">新規追加</a>
          </li>
        </ul>
      </main>
    </BaseLayout>
  )
}

export default IndexPage
