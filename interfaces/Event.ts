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
