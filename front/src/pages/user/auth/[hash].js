import { navigate } from "gatsby";
import api from "../../../utils/api";
import { useEffect } from "react";

const HashPage = ({ params }) => {

  useEffect(() => {
    const fetchData = async () => {
      const { hash } = params
      console.log(hash)
      const response = await api.post(`/register/${hash}`)
      if (response.status === 200) {
        navigate("/")
      }
    }
    fetchData()
  }, [params])
}

export default HashPage
