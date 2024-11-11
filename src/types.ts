export interface FormData {
  // Personal & Family Details
  fullName: string;
  email: string;
  phone: string;
  fatherName: string;
  motherName: string;
  address: string;
  occupation: string;
  income: string;
  panId: string;
  aadhaarId: string;
  
  // Bank Details
  accountName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  
  // Education Details
  xBoard: string;
  xYear: string;
  xPercentage: string;
  xMarksheet: File | null;
  xiiBoard: string;
  xiiYear: string;
  xiiPercentage: string;
  xiiMarksheet: File | null;
  collegeName: string;
  collegeYear: string;
  collegePercentage: string;
  collegeMarksheet: File | null;
}

export type FormErrors = Partial<Record<keyof FormData, string>>;