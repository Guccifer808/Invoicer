// import { configureStore } from "@reduxjs/toolkit";
// import invoiceSlice from "./invoiceSlice";


// const store = configureStore({
//     reducer: {
// invoices: invoiceSlice.reducer
//     }
// })

// export default store

import { configureStore } from "@reduxjs/toolkit";
import invoiceSlice from "./invoiceSlice";

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    invoices: invoiceSlice.reducer,
  },
});

export default store;
