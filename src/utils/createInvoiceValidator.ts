import { Invoice, Address, Item } from 'src/types/types';

export function validateSenderStreetAddress(streetAddress: Address['street']) {
  if (!streetAddress.trim()) {
    return false;
  }
  return true;
}

export function validateSenderCity(city: Address['city']) {
  if (!city.trim()) {
    return false;
  }
  return true;
}

export function validateSenderPostCode(postCode: Address['postCode']) {
  return /^\d{5}(-\d{4})?$/.test(postCode); // Basic post code validation
}

export function validateSenderCountry(country: Address['country']) {
  if (!country.trim()) {
    return false;
  }
  return true;
}

export function validateClientName(name: Invoice['clientName']) {
  return /^[a-zA-Z]+$/.test(name); // Only allow letters
}

export function validateClientEmail(email: Invoice['clientEmail']) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation
}

export function validateClientStreetAddress(streetAddress: Address['street']) {
  if (!streetAddress.trim()) {
    return false;
  }
  return true;
}

export function validateClientCity(city: Address['city']) {
  if (!city.trim()) {
    return false;
  }
  return true;
}

export function validateClientPostCode(postCode: Address['postCode']) {
  return /^\d{5}(-\d{4})?$/.test(postCode); // Basic post code validation
}

export function validateClientCountry(country: Address['country']) {
  if (!country.trim()) {
    return false;
  }
  return true;
}

export function validateItemName(itemName: Item['name']) {
  if (!itemName.trim()) {
    return false;
  }
  return true;
}

export function validateItemPrice(itemPrice: Item['price']) {
  if (itemPrice <= 0) {
    return false;
  }
  return true;
}

export function validateItemCount(itemCount: Item['quantity']) {
  if (itemCount <= 0) {
    return false;
  }
  return true;
}
