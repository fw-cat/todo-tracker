import React, { useEffect, useState } from "react"
import axiosInstance from "../utils/api"
import BaseLayout from "../components/Layout/Base"
import CreateForm from "../components/Parts/CreateForm"
import { navigate } from "gatsby"

const CreatePage = () => {
  // 入力オプション
  const [colors, setColors] = useState([])
  const [intervals, setIntervals] = useState({})
  const [isRemove, setIsRemove] = useState(false)
  const [trackerId, setTrackerId] = useState(1)
  const [trackers, setTrackers] = useState([{ id: trackerId, name: '', color: '', interval: '' }])
  const [optionsLoaded, setOptionsLoaded] = useState(false)


  const postTracker = async (event) => {
    event.preventDefault()
    console.log(trackers)
    await axiosInstance.post("/tracker", {
      trackers: trackers
    })
    navigate("/")
  }
  const addForm = (event) => {
    event.preventDefault()
    const newTrackerId = trackerId + 1
    setTrackerId(newTrackerId + 1)
    setTrackers([...trackers, { id: newTrackerId, name: '', color: '', interval: '' }])
    console.log(trackers)
    setIsRemove(true)
  }
  const handleChange = (index, key, value) => {
    const updatedTrackers = [...trackers]
    updatedTrackers[index][key] = value
    setTrackers(updatedTrackers)
  }
  const formRemove = (id) => {
    setTrackers(prevTrackers => prevTrackers.filter(tracker => tracker.id !== id))
    setIsRemove(prevTrackers => prevTrackers.length > 2)

  }

  // Render毎
  useEffect(() => {
    // 入力オプションを取得
    const getOptions = async () => {
      if (!optionsLoaded) {
        try {
          const responce = await axiosInstance.get("/tmp/options")
          setColors(responce.data.colors)
          setIntervals(responce.data.intervals)
          setOptionsLoaded(true)
        } catch (e) {
          console.log(e)
        }
      }
    };

    getOptions()
  }, [optionsLoaded])

  return (
    <BaseLayout id="create">
      <main>
        <form onSubmit={postTracker}>
          <h1><img src="/images/create/titile_ribbon@2x.png" alt="タイトル" /></h1>

          {optionsLoaded ? (
            <>
              {trackers.map((tracker, index) => (
                <CreateForm
                  key={tracker.id}
                  index={index}
                  colors={colors}
                  intervals={intervals}
                  tracker={tracker}
                  isRemove={isRemove}
                  handleChange={handleChange}
                  handleThisRemove={formRemove} />
              ))}
            </>
          ) : (
            <p>データ取得中...</p>
          )
          }

          <section className="add-input-group">
            <button type="button" onClick={addForm}>
              <img src="/images/create/add_group@2x.png" alt="フォームの追加" />
            </button>
          </section>

          <section className="submit-group">
            <button type="submit">
              <img src="/images/create/register_btn@2x.png" alt="登録" />
            </button>

            <a href="/">
              <img src="/images/create/back_link@2x.png" alt="戻る" />
            </a>
          </section>
        </form>
      </main>
    </BaseLayout >
  )
}

export default CreatePage
