import React, { useEffect, useState } from "react"
import axiosInstance from "../utils/api"
import Tracker from "../components/Parts/Tracker"
import BaseLayout from "../components/Layout/Base"
import { navigate } from 'gatsby';


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

  const gotoCreate = () => {
    navigate('/create');
  }

  return (
    <BaseLayout id="main">
      <h1><img src="/images/new_user/titile_ribbon@2x.png" alt="title" /></h1>

      <section id="trackers">
        {trackers.map(tracker => {
          return (
            <Tracker key={tracker.id} tracker={tracker}></Tracker>
          )
        })}

        <div
          role="button"
          tabIndex={0}
          className="tracker new-tracker"
          onClick={gotoCreate}
          onKeyDown={gotoCreate}>
          <p>
            <img src="/images/icons/new@2x.png" alt="new tracker" />
            NEW
          </p>
        </div>
        <div className="tracker blank-tracker">
        </div>
        <div className="tracker blank-tracker">
        </div>
      </section>
    </BaseLayout>
  )
}

export default IndexPage
