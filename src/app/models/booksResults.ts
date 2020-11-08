export interface VolumeInfo {
  allowAnonLogging: boolean;
  authors: string[];
  canonicalVolumeLink: string;
  contentVersion: string;
  imageLinks: { smallThumbnail: string; thumbnail: string; };
  industryIdentifiers: any[];
  infoLink: string;
  language: string;
  maturityRating: string;
  pageCount: number;
  panelizationSummary: { containsEpubBubbles: boolean; containsImageBubbles: boolean };
  previewLink: string;
  printType: string;
  publishedDate: string;
  readingModes: { text: false, image: true };
  publisher: string;
  description: string;
  title: string;
}

export interface Item {
  accessInfo: any;
  etag: string;
  id: string;
  kind: string;
  saleInfo: any;
  searchInfo: any;
  selfLink: string;
  volumeInfo: VolumeInfo;
}

export interface BooksResults {
  items: Item[];
  kind: string;
  totalItems: number;
}
