let eventGuid = 0;
const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All Day Event",
    start: new Date(y, m, 1),
    className: "event-default",
  },
  {
    id: createEventId(),
    title: "Repeating Event",
    start: new Date(y, m, d - 4, 6, 0),
    allDay: false,
    className: "event-rose",
  },
  {
    id: createEventId(),
    title: "Repeating Event",
    start: new Date(y, m, d + 3, 6, 0),
    allDay: false,
    className: "event-rose",
  },
];

export function createEventId(): string {
  return String(eventGuid++);
}
