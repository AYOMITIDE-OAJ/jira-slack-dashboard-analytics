import axios from 'axios'

import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const API_BASE_URL = process.env.API_BASE_URL
  const { slug, ...otherQueryParams }: any = req.query
  // const apiUrl = slug ? `${API_BASE_URL}/${slug.join("/")}` : null;
  const slugPath = slug ? `/${slug.join('/')}` : ''
  const queryParams =
    Object.keys(otherQueryParams).length > 0
      ? `?${new URLSearchParams(otherQueryParams)}`
      : ''

  const apiUrl = `${API_BASE_URL}${slugPath}${queryParams}`

  if (!apiUrl) {
    return res.status(400).json({ error: 'Invalid request' })
  }

  try {
    const response = await axios({
      method: req.method,
      url: apiUrl,
      headers: {
        Authorization: req?.headers?.authorization,
      },
      data: req.body,
    })

    res.status(response.status).json(response.data)
  } catch (error: any) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: 'Internal Server Error' })
  }
}
