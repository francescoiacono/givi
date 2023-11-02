// export interface BlogPost {
//   id: string;
//   title: string;
//   content: string;
//   summary: string;
//   date: Date;
// }

export class BlogPost {
  id: string;
  title: string;
  content: string;
  summary: string;
  date: number;

  constructor(
    id: string,
    title: string,
    content: string,
    summary: string,
    date: number
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.summary = summary;
    this.date = date;
  }

  public getId(): string {
    return this.id;
  }

  public update(title?: string, content?: string, summary?: string): BlogPost {
    this.title = title || this.title;
    this.content = content || this.content;
    this.summary = summary || this.summary;

    return this;
  }
}
