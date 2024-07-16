import api from "../../../utils/api";

export default async function handler(req, res) {
  const hash_code = req.params.hash

  const responce = await api.post(`/register/${hash_code}`)
  console.log(responce)
}
