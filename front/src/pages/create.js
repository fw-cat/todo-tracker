import React, { useEffect, useState } from "react"
import axiosInstance from "../utils/api"
import BaseLayout from "../components/Layout/Base"
import CreateForm from "../components/Parts/CreateForm"
import { navigate } from "gatsby"

const CreatePage = () => {
  // 入力オプション
  const [colors, setColors] = useState([]);
  const [intervals, setIntervals] = useState([]);
  const [trackers, setTrackers] = useState([{ name: '', color: '', interval: '' }]);

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
    setTrackers([...trackers, { name: '', color: '', interval: '' }]);
  }
  const handleChange = (index, key, value) => {
    const updatedTrackers = [...trackers]
    updatedTrackers[index][key] = value
    setTrackers(updatedTrackers)
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
    <BaseLayout>
      <main>
        <h1>create</h1>
        <form onSubmit={postTracker}>

          {trackers.map((tracker, index) => (
            <CreateForm key={index} index={index} colors={colors} intervals={intervals} handleChange={handleChange} />
          ))}

          <div>
            <button type="button" onClick={addForm}>追加</button>
          </div>

          <div className="form-submit">
            <button type="submit">
              登録
            </button>
          </div>
        </form>
      </main>
    </BaseLayout >
  )
}

export default CreatePage
