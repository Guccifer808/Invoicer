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
  total: number;
  id: string | number;
}
export interface ItemDetails {
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
export interface RootState {
  invoices: InvoiceState;
}

export interface DeleteModalProps {
  invoiceId: string;
  onDeleteButtonClick: () => void;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
