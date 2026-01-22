import { NextResponse } from "next/server";

type ProductId = "stream_pass" | "personal_download" | "group_license";

/* ------------------------------------------------------------------ */
/* Product config (SERVER SOURCE OF TRUTH) */
/* ------------------------------------------------------------------ */

const PRODUCTS: Record<ProductId, { name: string; price: string }> = {
  stream_pass: {
    name: "72-Hour Stream Pass",
    price: "7.99",
  },
  personal_download: {
    name: "Personal Download",
    price: "11.99",
  },
  group_license: {
    name: "Group License",
    price: "49.99",
  },
};

/* ------------------------------------------------------------------ */
/* PayPal helpers */
/* ------------------------------------------------------------------ */

async function getPaypalAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(`${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to get PayPal access token");
  }

  return data.access_token;
}

/* ------------------------------------------------------------------ */
/* Route */
/* ------------------------------------------------------------------ */

export async function POST(req: Request) {
  try {
    // --------------------------------------------------
    // Auth check (replace with your real auth later)
    // --------------------------------------------------
    const authHeader = req.headers.get("cookie");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // --------------------------------------------------
    // Parse & validate product
    // --------------------------------------------------
    const body = await req.json();
    const product = body.product as ProductId;

    if (!product || !PRODUCTS[product]) {
      return NextResponse.json({ message: "Invalid product" }, { status: 400 });
    }

    const { name, price } = PRODUCTS[product];

    // --------------------------------------------------
    // Create PayPal order
    // --------------------------------------------------
    const accessToken = await getPaypalAccessToken();

    const orderRes = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              description: name,
              amount: {
                currency_code: "CAD",
                value: price,
              },
            },
          ],
          application_context: {
            brand_name: "Life Worth Living",
            landing_page: "LOGIN",
            user_action: "PAY_NOW",
            return_url: process.env.NEXT_PUBLIC_BASE_URL + "/checkout/success",
            cancel_url: process.env.NEXT_PUBLIC_BASE_URL + "/dashboard",
          },
        }),
      }
    );

    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      console.error(orderData);
      throw new Error("PayPal order creation failed");
    }

    const approvalUrl = orderData.links.find(
      (link: any) => link.rel === "approve"
    )?.href;

    if (!approvalUrl) {
      throw new Error("Approval URL not found");
    }

    return NextResponse.json({ approvalUrl });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return NextResponse.json(
      { message: "Failed to create PayPal order" },
      { status: 500 }
    );
  }
}
