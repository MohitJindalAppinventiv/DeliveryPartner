import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventPopup from "./EventPopup";
const localizer = momentLocalizer(moment);

interface SlotEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

export const initialEvents: SlotEvent[] = [
  {
    id: 1,
    title: "Meeting with John",
    start: moment().add(1, "days").set({ hour: 10, minute: 0 }).toDate(),
    end: moment().add(1, "days").set({ hour: 11, minute: 0 }).toDate(),
  },
  {
    id: 2,
    title: "Team Standup",
    start: moment().set({ hour: 9, minute: 30 }).toDate(),
    end: moment().set({ hour: 10, minute: 0 }).toDate(),
  },
  {
    id: 3,
    title: "Lunch Break",
    start: moment().set({ hour: 13, minute: 0 }).toDate(),
    end: moment().set({ hour: 14, minute: 0 }).toDate(),
  },
  {
    id: 4,
    title: "Client Presentation",
    start: moment().add(2, "days").set({ hour: 15, minute: 0 }).toDate(),
    end: moment().add(2, "days").set({ hour: 16, minute: 30 }).toDate(),
  },
  {
    id: 5,
    title: "Code Review",
    start: moment().add(3, "days").set({ hour: 11, minute: 0 }).toDate(),
    end: moment().add(3, "days").set({ hour: 12, minute: 0 }).toDate(),
  },
  {
    id: 6,
    title: "Project Kickoff",
    start: moment().add(5, "days").set({ hour: 14, minute: 0 }).toDate(),
    end: moment().add(5, "days").set({ hour: 15, minute: 30 }).toDate(),
  },
  {
    id: 7,
    title: "Interview with Candidate",
    start: moment().add(1, "week").set({ hour: 10, minute: 0 }).toDate(),
    end: moment().add(1, "week").set({ hour: 11, minute: 30 }).toDate(),
  },
];

export default function CalendarComponent(props) {
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpenEvent, setIsOpenEvent] = useState<boolean | null>(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event: any) => {
    setSelectedDate(null);
    setSelectedEvent(event);
    setIsOpenEvent(true);
  };

  const handleSelectSlot = (slotInfo: any) => {
    const today=new Date();
    today.setHours(0,0,0,0);

    if(slotInfo.start<today){
      alert("Cannot select past dates.");
      return;
    }
    setSelectedDate(slotInfo.start);
    setSelectedEvent(null);
    setIsOpenEvent(true);
  };

  const handleSave=(eventData)=>{
    if(eventData.id){
      setEvents((prev)=>
        prev.map((ev)=>(ev.id === eventData.id?eventData:ev))
      )
    } else{
      const newEvent={
        ...eventData,
        id:events.length+1
      };
      setEvents((prev)=>[...prev,newEvent])
    }
  }

  return (
    <>
      <div className="mr-20 ml-20 mt-20">
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          style={{ height: "77vh" }}
        />
      </div>
      {isOpenEvent && (
        <EventPopup 
          isOpen={isOpenEvent}
          onClose={()=>setIsOpenEvent(false)}
          onSave={handleSave}
          date={selectedDate}
          event={selectedEvent}
        />
      )}
    </>
  );
}
