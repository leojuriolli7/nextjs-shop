// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@lib/stripe";

type Data = {
  checkoutUrl?: string | null;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { host } = req.headers;
  const { cart } = req.body;

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  if (!cart) return res.status(400).json({ error: "Product not found" });

  const successUrl = `https://${host}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `https://${host}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: cart,
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
