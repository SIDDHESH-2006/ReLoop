import { RouterProvider } from "react-router";
import { StoreProvider } from "./lib/store";
import { router } from "./app/routes";

export default function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}
