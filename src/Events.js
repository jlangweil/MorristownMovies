import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Events.css';

/* const fetchEvents = async (setEvents) => {
    const meetupUrl = 'https://api.meetup.com/YOUR_MEETUP_GROUP/events'; // Replace 'YOUR_MEETUP_GROUP' with your Meetup group's URL name
    const apiKey = 'YOUR_MEETUP_API_KEY'; // Replace with your Meetup API key
  
    try {
      const response = await axios.get(`${meetupUrl}?key=${apiKey}&status=upcoming&page=50`);
      const fetchedEvents = response.data.map((event) => ({
        title: event.name,
        start: new Date(event.time),
        end: new Date(event.time + event.duration),
        url: event.link,
      }));
  
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }; */

const Events = () => {
    // const [events, setEvents] = useState([]);
    const localizer = momentLocalizer(moment);
  
    // useEffect(() => {
    //   fetchEvents(setEvents);
    // }, []);

    const [events, setEvents] = useState([
        {
          title: 'In Person Event',
          start: new Date(), // Sets the event start time to the current date and time
          end: new Date(new Date().getTime() + 60 * 60 * 1000), // Sets the event end time to one hour after the start time
        },
      ]);
      
  
    const eventStyleGetter = (event) => {
      const backgroundColor = '#3f51b5';
      const style = {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      };
      return {
        style,
      };
    };
  
    return (
      <div style={{ height: '550px'}}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={(event) => {
            window.open(event.url, '_blank');
          }}
        />
      </div>
    );
  };
  
  export default Events;