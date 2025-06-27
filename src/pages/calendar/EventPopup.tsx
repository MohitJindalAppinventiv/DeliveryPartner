import { useState, useEffect } from "react";

interface EventData {
  id?: number;
  title: string;
  start: Date;
  end: Date;
}

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: EventData) => void;
  date: Date | null;
  event: EventData | null;
}

export default function EventPopup({
  isOpen,
  onClose,
  onSave,
  date,
  event,
}: EventPopupProps) {
  const [title, setTitle] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setStart(new Date(event.start).toISOString().slice(0, 16));
      setEnd(new Date(event.end).toISOString().slice(0, 16));
    } else if (date) {
      const startTime = new Date(date);
      const endTime = new Date(date);
      endTime.setHours(startTime.getHours() + 1);

      setTitle("");
      setStart(startTime.toISOString().slice(0, 16));
      setEnd(endTime.toISOString().slice(0, 16));
    } else {
      setTitle("");
      setStart("");
      setEnd("");
    }
  }, [event, date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (endDate <= startDate) {
      alert("End time must be after start time.");
      return;
    }

    onSave({
      id: event?.id,
      title,
      start: startDate,
      end: endDate,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm backdrop-brightness-75 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {event ? "Edit Event" : "Add Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
