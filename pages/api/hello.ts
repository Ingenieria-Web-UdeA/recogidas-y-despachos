// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // res.status(200).json({ name: 'John Doe' })
  try {
    // console.log(
    //   'estoy recibiendo un reuest',
    //   req.body,
    //   req.headers,
    //   req.method
    // );
    res.status(200).json({ name: 'Daniel' });
  } catch {
    res.status(500);
  }
}
