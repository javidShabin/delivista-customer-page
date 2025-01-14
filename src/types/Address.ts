export interface Address {
    _id: string;
    userId: string;
    address: String,
    fullName: string;
    phoneNumber: string;
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    addressType: "Home" | "Work" | "Other";
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
  }
  