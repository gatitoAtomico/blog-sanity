import { getAllAssets } from "lib/api";

export default async function getAssets(req, res) {
  const data = await getAllAssets();
  res.status(200).json(data);
}
