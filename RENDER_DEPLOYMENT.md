# Deploy the WinJolt frontend on Render

Deploy the backend first so its public URL is available.

## Create the static site

1. In Render, choose **New > Static Site** and connect the frontend GitHub repository.
2. Set **Build Command** to `npm ci && npm run build`.
3. Set **Publish Directory** to `build`.
4. Add this environment variable:

   ```text
   REACT_APP_API_URL=https://<your-backend>.onrender.com/api/v1
   ```

5. Add a **Rewrite** under Redirects/Rewrites:

   ```text
   Source:      /*
   Destination: /index.html
   Action:      Rewrite
   ```

6. Deploy the site.

The checked-in `render.yaml` contains the same settings, including the React Router rewrite, and can alternatively be used with **New > Blueprint**.

`REACT_APP_API_URL` is embedded during the build. If the backend URL changes, update the value and trigger a new frontend deploy. It is a public browser setting, so never put secrets in any `REACT_APP_*` variable.

## Connect the backend

Copy the deployed frontend URL and set both of these variables on the backend web service:

```text
FRONTEND_URL=https://<your-frontend>.onrender.com
PUBLIC_WEB_URL=https://<your-frontend>.onrender.com
```

Then redeploy the backend. Do not include `/api/v1` in either backend variable.

## Verify

1. Open the frontend home page.
2. Refresh a nested route such as `/sign-in`; it should not return a Render 404.
3. In browser developer tools, confirm API requests go to the backend Render domain and do not show CORS errors.

