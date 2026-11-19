export class citizenModel {
  request: {
    appType: string;
    email: string;
    name: string;
    purpose: number;
    ceName: string;
    appFor: number;
    indType: number;
    distId: number;
    blockId: number;
    address: string;
    panNo: string;
    presentCap: number;
    futureCap: number;
    quanIntended: number;
    opQuant: number;
    phaseReq: [
      {
        from: string;
        to: string;
        unit: number
      }
    ];
    phasewise: string;
  };
}
export class paymentDetails {
  IndustryName: string;
  Industry_Code: number;
  Contact: number;
  Address: string;
  Pin: number;
  EmailID: string;
  District: string;
  PaymentTowards: string;
  Trs_Head_Proces: string;
  Trs_Head_Secu: string;
  Application_Typ: string;
  Amount_Proces: number;
  Amount_Secu: number;
}
