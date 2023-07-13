interface IComment {
  id: number;
  created_At?: number;
  name: string;
  content: string;
  for: any;
  event_slug: string;
}

interface IEvent {
  slug: string;
  comments: IComment[];
  user: any;
  uid: string;
}
