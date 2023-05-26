export interface Invoice {
    id: string;
    createdAt: string;
    paymentDue: string;
    description: string;
    paymentTerms: number;
    clientName: string;
    clientEmail: string;
    status: string;
    senderAddress: Address;
    clientAddress: Address;
    items: Item[];
    total: number;
  }
  
  export interface Address {
    street: string;
    city: string;
    postCode: string;
    country: string;
  }
  
  export interface Item {
    name: string;
    quantity: number;
    price: number;
    total: number;
    id: string | number;
  }
  export interface InvoiceItem {
    name: string;
    quantity: number;
    price: number;
    total: number | string;
    id: string | number;
  }
  
  export interface InvoiceState {
    allInvoices: Invoice[];
    filteredInvoice: Invoice[];
    invoiceById: Invoice | null;
  }