import { Moment } from "moment";

export interface TAttachmentInfo {
  timeStamp: Moment;
  pagesRanges: string | null;
  reason: string | null;
  sentDateMmtUtc: Moment;
  from: string;
  subject: string,
  fileName: string,
  messageId: string,
  attachmentId: string
}


export type TPrintedMailsResponse = Array<TAttachmentInfo>;
