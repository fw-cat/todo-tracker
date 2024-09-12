import React, { useEffect, useState } from "react"
import axiosInstance from "../utils/api"
import BaseLayout from "../components/Layout/Base"
import EditForm from "../components/Parts/EditForm"
import { navigate, Link } from "gatsby"

const EditPage = ({location}) => {
  // 入力オプション
  const [colors, setColors] = useState([])
  const [trackers, setTrackers] = useState([])
  const [optionsLoaded, setOptionsLoaded] = useState(false)


  const updateTracker = async (event) => {
    event.preventDefault()
    console.log(trackers)
    await axiosInstance.put("/tracker", {
      trackers: trackers
    })
    navigate("/")
  }

  const handleChange = (index, key, value) => {
    setTrackers(prevTrackers => {
      const updatedTrackers = [...prevTrackers];
      updatedTrackers[index] = {
        ...updatedTrackers[index],
        [key]: value
      };
      return updatedTrackers;
    });
  }
  const formRemove = (id) => {
    setTrackers(prevTrackers => prevTrackers.filter(tracker => tracker.id !== id))

  }

  // Render毎
  useEffect(() => {
    const trackersData = location.state?.trackers || []
    setTrackers(trackersData)

    // 入力オプションを取得
    const getOptions = async () => {
      if (!optionsLoaded) {
        try {
          const responce = await axiosInstance.get("/tmp/options")
          setColors(responce.data.colors)
          setOptionsLoaded(true)
        } catch (e) {
          console.log(e)
        }
      }
    };

    getOptions()
  }, [location.state, optionsLoaded])

  // ヘッダー
  const headerContent = (
    <>
      <h1>HABIT TRACKER</h1>
      <Link to="/">
        <img src="/images/icons/cancel@2x.png" alt="キャンセル" />
      </Link>
    </>
  );

  return (
    <BaseLayout id="edit" headerContent={headerContent}>
      <main>
        <h1><img src="/images/edit/titile_ribbon@2x.png" alt="タイトル" /></h1>
        <form onSubmit={updateTracker}>
          <section id="trackers">
            {optionsLoaded ? (
              <>
                {trackers.map((tracker, index) => (
                  <EditForm
                    key={tracker.id}
                    index={index}
                    colors={colors}
                    tracker={tracker}
                    handleChange={handleChange}
                    handleThisRemove={formRemove} />
                ))}
              </>
            ) : (
              <p>データ取得中...</p>
            )
            }
          </section>

          <div>
            <button type="submit">
              <img src="/images/edit/update_btn@2x.png" alt="更新ボタン" />
            </button>
          </div>
        </form>
      </main>
    </BaseLayout >
  )
}

export default EditPage
