


export interface IClinicCaseRaw {
  id: string;
  caseNumber: string;
  title: string;
  beginningDate: string;
  url: string;
  patientId: string;
  userId: string;
}


export type CreateClinicCaseData = Omit<IClinicCaseRaw, 'id' | 'userId' | 'url' > & {
  pdf: File
};

export type UpdateClinicCase = Omit<IClinicCaseRaw, 'id' | 'userId' | 'url' | 'patientId' > & {
  pdf?: File
};