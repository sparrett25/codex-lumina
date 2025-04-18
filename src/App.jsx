import AppRouter from "./AppRouter";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Toaster position="top-center" richColors closeButton theme="dark" />
      <AppRouter />
    </>
  );
}
