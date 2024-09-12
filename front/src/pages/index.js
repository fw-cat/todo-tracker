import React, { useEffect, useState } from "react"
import axiosInstance from "../utils/api"
import Tracker from "../components/Parts/Tracker"
import BaseLayout from "../components/Layout/Base"
import { navigate, Link } from 'gatsby';


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

  const trackerChecked = async (id) => {
    try {
      const response = await axiosInstance.post(`/tracker/${id}/check`)
      console.log(response)
      setTrackers(response.data.trackers);
    } catch (e) {
      console.log(e)
    }
  }

  // 空枠線を表示する数
  const emptyCnt = () => {
    const remainder = trackers.length % 3
    switch(remainder) {
      case 0: return 2;
      case 1: return 1;
      case 2: return 3;
      default: return 0;
    }
  }

  // ヘッダー
  const headerContent = (
    <>
      <Link to="/create">
        <img src="/images/icons/setting@2x.png" alt="設定" />
      </Link>
      <h1>HABIT TRACKER</h1>
      <Link to="/edit" state={{ trackers: trackers }}>
        <img src="/images/icons/edit@2x.png" alt="修正" />
      </Link>
    </>
  );

  return (
    <BaseLayout id="main" headerContent={headerContent}>
      <h1><img src="/images/main/titile_ribbon@2x.png" alt="title" /></h1>

      <section id="trackers">
        {trackers.map(tracker => {
          return (
            <Tracker
              key={tracker.id}
              tracker={tracker}
              checked={trackerChecked} />
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
        {[...Array(emptyCnt())].map((_, index) => (
          <div key={index} className="tracker blank-tracker"></div>
        ))}
      </section>
    </BaseLayout>
  )
}

export default IndexPage
