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
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }
  export interface InvoiceItem {
    name: string;
    quantity: number;
    price: number;
    total: number;
    id: string;
  }
  
  export interface InvoiceState {
    allInvoices: Invoice[];
    filteredInvoice: Invoice[];
    invoiceById: Invoice | null;
  }