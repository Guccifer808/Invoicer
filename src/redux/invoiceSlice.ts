import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockData from '../mockData/mockData.json';
import moment from "moment";
import getForwardDate from "../utils/forwardDate";
import generateID from "../utils/generateId";

import {Invoice, InvoiceItem, InvoiceState} from '../types/types'

const today = moment().format("YYYY-MM-DD");

const invoiceSlice = createSlice({
  name: "invoices",

  initialState: {
    allInvoices: mockData as Invoice[],
    filteredInvoice: [] as Invoice[],
    invoiceById: null as Invoice | null,
  } as InvoiceState,

  reducers: {
    filterInvoice: (state, action: PayloadAction<{ status: string }>) => {
      const { allInvoices } = state;
      if (action.payload.status === "") {
        state.filteredInvoice = allInvoices;
      } else {
        const filteredData = allInvoices.filter((invoice) => {
          return invoice.status === action.payload.status;
        });
        console.log(filteredData);
        state.filteredInvoice = filteredData;
      }
    },
    getInvoiceById: (state, action: PayloadAction<{ id: string }>) => {
      const { allInvoices } = state;
      const invoice = allInvoices.find((item) => item.id === action.payload.id);
      state.invoiceById = invoice || null;
    },
    deleteInvoice: (state, action: PayloadAction<{ id: string }>) => {
      const { allInvoices } = state;
      const index = allInvoices.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        allInvoices.splice(index, 1);
      }
    },
    updateInvoiceStatus: (state, action: PayloadAction<{ id: string, status: string }>) => {
      const { id, status } = action.payload;
      const invoiceToUpdate = state.allInvoices.find(
        (invoice) => invoice.id === id
      );
      if (invoiceToUpdate) {
        invoiceToUpdate.status = status;
      }
    },
    addInvoice: (state, action: PayloadAction<{
      description: string;
      paymentTerms: number;
      clientName: string;
      clientEmail: string;
      senderStreet: string;
      senderCity: string;
      senderPostCode: string;
      senderCountry: string;
      clientStreet: string;
      clientCity: string;
      clientPostCode: string;
      clientCountry: string;
      item: InvoiceItem[];
    }>) => {
      const {
        description,
        paymentTerms,
        clientName,
        clientEmail,
        senderStreet,
        senderCity,
        senderPostCode,
        senderCountry,
        clientStreet,
        clientCity,
        clientPostCode,
        clientCountry,
        item,
      } = action.payload;

      const finalData: Invoice = {
        id: `${generateID()}`,
        createdAt: today,
        paymentDue: getForwardDate(paymentTerms),
        description: description,
        paymentTerms: paymentTerms,
        clientName: clientName,
        clientEmail: clientEmail,
        status: "pending",
        senderAddress: {
          street: senderStreet,
          city: senderCity,
          postCode: senderPostCode,
          country: senderCountry,
        },
        clientAddress: {
          street: clientStreet,
          city: clientCity,
          postCode: clientPostCode,
          country: clientCountry,
        },
        items: item,
        total: item.reduce((acc, i) => {
          return acc + Number(i.total);
        }, 0),
      };
      state.allInvoices.push(finalData);
    },
    editInvoice: (state, action: PayloadAction<{
      description: string;
      paymentTerms: number;
      clientName: string;
      clientEmail: string;
      senderStreet: string;
      senderCity: string;
      senderPostCode: string;
      senderCountry: string;
      clientStreet: string;
      clientCity: string;
      clientPostCode: string;
      clientCountry: string;
      item: InvoiceItem[];
      id: string;
    }>) => {
      const { allInvoices } = state;
      const {
        description,
        paymentTerms,
        clientName,
        clientEmail,
        senderStreet,
        senderCity,
        senderPostCode,
        senderCountry,
        clientStreet,
        clientCity,
        clientPostCode,
        clientCountry,
        item,
        id,
      } = action.payload;

      const invoiceIndex = allInvoices.findIndex((invoice) => invoice.id === id);
      const editedObject = {
        description: description,
        paymentTerms: paymentTerms,
        clientName: clientName,
        clientEmail: clientEmail,
        senderAddress: {
          street: senderStreet,
          city: senderCity,
          postCode: senderPostCode,
          country: senderCountry,
        },
        clientAddress: {
          street: clientStreet,
          city: clientCity,
          postCode: clientPostCode,
          country: clientCountry,
        },
        items: item,
        total: item.reduce((acc, i) => {
          return acc + Number(i.total);
        }, 0),
      };

      if (invoiceIndex !== -1) {
        allInvoices[invoiceIndex] = {
          ...allInvoices[invoiceIndex],
          ...editedObject
        };
      }
    },
  },
});

export default invoiceSlice;
