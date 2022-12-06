
# NextJS Shop

This project was made with [Next.js](https://nextjs.org/) and consumes
 the [Stripe API](https://stripe.com/). It's an e-commerce with a shopping cart.
 
 It was originally developed for the [Rocketseat Ignite Course](https://www.rocketseat.com.br/), for learning Next.js. After finishing the original project, I expanded it by adding:
 1. Shopping cart managed by global state.
 2. Cleaner code & best practices. (Custom hooks, utility functions)
 3. SEO optimizations (Metatags).
 4. Responsive design.
 
 
## Tech Stack

- Next.js & Typescript.
- [Stitches](https://stitches.dev/) for styling (_css-in-JS_ similar to [Styled Components](https://styled-components.com/))
- Axios for API requests.
- Zustand for managing state.
## Features

- Uses **SSR** for very fast **server-side rendered** pages.
- Uses **SSG** for very optimized **static** pages.
- Uses **Next.js API routes** for Stripe API call on checkout.
- Shopping cart managed by global state & communicating with the Stripe API. (With logic for duplicated items, maximum limit per user, etc.)
- Clean code practices (Custom hooks, utility functions, performance optimizations with `useCallback`, `useMemo`)
- Responsive design for all devices.
- SEO optimizations (metatags for image, description, title, etc.)

## Deployment

The project has been deployed on Vercel.

Access: https://nextjs-ignite-shop.vercel.app/
