import React, { useEffect, useState } from "react"
import BaseLayout from "../../components/Layout/Base"
import { Link } from 'gatsby'
import axiosInstance from "../../utils/api"

const SettingsPage = () => {
  const [isAchievement, setAchievement] = useState('')

  const toggleAchievement = async (e) => {
    try {
      const response = await axiosInstance.put('/user/settings/achievement', {})
      setAchievement(!isAchievement)

    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get('/me');
        setAchievement(response.data.user.setting.is_achievement)

      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchUserInfo();
  }, [])

  // ヘッダー
  const headerContent = (
    <>
      <Link to="/">
        <img src="/images/icons/cancel@2x.png" alt="キャンセル" />
      </Link>
      <h1>HABIT TRACKER</h1>
    </>
  );

  return (
    <BaseLayout id="setting" headerContent={headerContent}>
      <main>
        <h1><img src="/images/setting/titile_ribbon@2x.png" alt="ユーザ設定" /></h1>

        <ul className="setttings-menu">
          <li>
            <a href="change_password.html" className="btn">
              <span className="material-symbols-outlined">lock</span>
              パスワード変更
            </a>
          </li>

          <li>
            <label>
              <input
                type="checkbox"
                id="is_achievement"
                checked={isAchievement}
                onChange={(e) => toggleAchievement(e)}
                value={true}
              />
              達成度表示機能 ON（PCのみ表示）
            </label>
          </li>

          <li>
            <label>
              <input type="checkbox" id="is_achievement" />
              メッセージ機能
            </label>
            <ul>
              <li>
                <label>
                  <input type="radio" name="message_type" />ノーマル
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="message_type" />スパルタ
                </label>
              </li>
            </ul>
          </li>
        </ul>
      </main>
    </BaseLayout>
  )
}

export default SettingsPage

export const Head = () => <title>SettingsPage | Todo Tracker</title>
