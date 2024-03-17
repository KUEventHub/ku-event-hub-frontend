export interface EventData {
  event: {
    name: string;
    activityHours: string;
    totalSeats: string;
    startTime: number;
    endTime: number;
    location: string;
    description: string;
    eventTypes: string[];
    image: {
      base64Image: string | undefined;
    };
  };
}

export interface CheckQRCode {
  eventId: string;
  encryptedString: string;
}

export interface Event {
  id: string;
  name: string;
  eventTypes: {
    _id: string;
    name: string;
  }[];
  imageUrl: string;
  activityHours: number;
  totalSeats: number;
  startTime: Date;
  endTime: Date;
  location: string;
  participantsCount: number;
}

export interface EventSummary {
  name: string;
  count: number;
  hours: number;
  children: {
    events?: Event[];
    subtype?: {
      name: string;
      count: number;
      hours: number;
      events: Event[];
    }[];
  };
}
