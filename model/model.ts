/** A person related to a one pager. */
export interface OnePagerPerson {
  name: string;
  title: string;
  description?: string;
  email?: string; // added email
}

/** Public access one pager data fields. */
export interface OnePagerPublicData {
  companyName: string;
  url: string;
  industryTags: string[];
  briefDescription: string;
  imageLink: string; // added company logo link
}

/** Full one pager data model. */
export interface OnePagerData {
  companyName: string;
  url: string;
  industryTags: string[];
  briefDescription: string;
  detailDescription?: string;
  founders: OnePagerPerson[];
  fundraisingStage?: string;
  fundraisingStageGoal?: number;
  fundsRaisedInStage?: number;
  fundraisingDetails?: string;
  pitchVideoLink?: string;
  imageLink?: string; // added company logo link
  investors?: OnePagerPerson[];
}
