import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <>
      <Header />
      <main className="container mt-4">
        <AppRouter />
      </main>
      <Footer />
    </>
  );
}
