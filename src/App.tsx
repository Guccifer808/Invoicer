import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import invoiceSlice from "./redux/invoiceSlice";
import InvoiceInfo from "./components/InvoiceInfo";

function App() {
  const dispatch = useDispatch();

  const onDelete = (id: string) => {
    dispatch(invoiceSlice.actions.deleteInvoice({ id: id }));
  };

  return (
    <Router>
      <div className="min-h-screen bg-light duration-300 dark:bg-dark">
        <Header />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<Main />} path="" />
            <Route
              element={<InvoiceInfo onDelete={onDelete} />}
              path="/invoice"
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
