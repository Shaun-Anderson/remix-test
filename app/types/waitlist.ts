export interface Waitlist {
  _id: string;
  name: string;
  fields: WaitlistEntry;
}

export interface WaitlistEntry {
  _id: string;
  name: string;
  email: string;
  customFields: CustomField[];
}

export interface CustomField {
  _id: string;
  name: string;
  type: "text" | "number";
  value: string;
  required: boolean;
}

/* 
waitlists : {
  {
    _id: awdwadawhbaoiuhaei12j3,
    name: Waitlist #1,
    fields: {
      
    }
  }
}

*/
