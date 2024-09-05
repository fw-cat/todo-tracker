import React, { useEffect, useState } from "react"
import axiosInstance from "../utils/api"
import BaseLayout from "../components/Layout/Base"
import CreateForm from "../components/Parts/CreateForm"
import { navigate } from "gatsby"

let trackerId = 1;
const CreatePage = () => {
  // 入力オプション
  const [colors, setColors] = useState([]);
  const [intervals, setIntervals] = useState([]);
  const [trackers, setTrackers] = useState([{ id: trackerId, name: '', color: '', interval: '' }]);

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
    trackerId += 1
    setTrackers([...trackers, { id: trackerId, name: '', color: '', interval: '' }]);
  }
  const handleChange = (index, key, value) => {
    const updatedTrackers = [...trackers]
    updatedTrackers[index][key] = value
    setTrackers(updatedTrackers)
  }
  const formRemove = (id) => {
    setTrackers(trackers.filter(tracker => tracker.id !== id));
  }

  // 初回のみ起動
  useEffect(() => {
    // 入力オプションを取得
    const getOptions = async () => {
      try {
        const responce = await axiosInstance.get("/tmp/options");
        setColors(responce.data.colors)
        setIntervals(responce.data.intervals)
      } catch (e) {
        console.log(e)
      }
    }
    getOptions()
  },[])

  return (
    <BaseLayout id="create">
      <main>
        <form onSubmit={postTracker}>
          <h1><img src="/images/create/titile_ribbon@2x.png" alt="タイトル" /></h1>

          {trackers.map((tracker, index) => (
            <CreateForm
              key={tracker.id}
              index={index}
              colors={colors}
              intervals={intervals}
              tracker={tracker}
              handleChange={handleChange}
              handleThisRemove={formRemove} />
          ))}

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
