export class VolumeInfo {
  allowAnonLogging?: boolean;
  authors?: string[];
  canonicalVolumeLink?: string;
  contentVersion?: string;
  imageLinks?: { smallThumbnail?: string; thumbnail?: string; };
  industryIdentifiers?: any[];
  infoLink?: string;
  language?: string;
  maturityRating?: string;
  pageCount?: number;
  panelizationSummary?: { containsEpubBubbles?: boolean; containsImageBubbles?: boolean };
  previewLink?: string;
  printType?: string;
  publishedDate?: string;
  readingModes?: { text?: false, image?: true };
  publisher?: string;
  description?: string;
  title: string;

  constructor(vi: VolumeInfo) {
    this.authors = vi.authors;
    this.publisher = vi.publisher;
    this.publishedDate = vi.publishedDate;
    this.imageLinks = vi.imageLinks;
    this.description = vi.description;
    this.title = vi.title;
  }
}

export class Item {
  accessInfo?: any;
  etag?: string;
  id: string;
  kind?: string;
  saleInfo?: any;
  searchInfo?: any;
  selfLink?: string;
  volumeInfo: VolumeInfo;

  constructor(item: Item) {
    this.id = item.id;
    this.volumeInfo = new VolumeInfo(item.volumeInfo);
  }
}

export class BooksResults {
  items: Item[];
  kind?: string;
  totalItems: number;

  constructor(booksResults: BooksResults) {
    this.items = booksResults.items.map(i => new Item(i));
    this.totalItems = booksResults.totalItems;
  }
}
