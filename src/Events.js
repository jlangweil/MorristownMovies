import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Events.css';


const Events = () => {
    const [events, setEvents] = useState([]);
    const [transformedEvents, setTransformedEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const localizer = momentLocalizer(moment);
    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchMeetupEvents = async (url) => {
      try {
        const response = await axios.get(url);
        const html = response.data;
    
        const $ = cheerio.load(html);
    
        const events = [];
    
        // Update this selector based on the HTML structure of the specific Meetup group page.
        $('div.eventCard--link').each((_, element) => {
          const title = $(element).find('div.eventCardHead--title').text().trim();
          const date = $(element).find('div.eventTimeDisplay-startDate').text().trim();
          const time = $(element).find('div.eventTimeDisplay-startTime').text().trim();
    
          events.push({ title, date, time });
        });
    
        return events;
      } catch (error) {
        console.error('Error fetching Meetup events:', error);
        return [];
      }
    };
  
    useEffect(() => {
      async function fetchEvents() {
        try {
          const response = await axios.get(`${apiUrl}/events`);
          setEvents(response.data);
        } catch (error) {
          console.error('Error fetching events:', error);
        } finally {
          setIsLoading(false);
        }
      }
    
      fetchEvents();
    }, []);
    
    useEffect(() => {
      setTransformedEvents(
        events.map((event) => {
          return {
            title: event.name,
            start: new Date(event.startDate),
            end: new Date(event.endDate),
            url: event.url,
          };
        })
      );
    }, [events]);
          
  
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

      <>
       <h1>Upcoming Meetup Events</h1>
      <Row className="justify-content-center">
      {isLoading ? (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
       ) : (
      events.map((event) => {
          const startDate = new Date(event.startDate);
          const dateString = startDate.toLocaleDateString();
          const timeString = startDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          const shortDescription =
            event.description.length > 200
              ? event.description.slice(0, 200) + '...'
              : event.description;

          return (
            <Col xs={12} xl={5} key={event.url} className="event-item">
              <h2 className="event-title">{event.name}</h2>
              <p className="event-date-time">
                {dateString} @ {timeString}
              </p>
              <p className="event-description">{shortDescription}</p>
              <Button
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="event-button"
              > 
                View Event Details
              </Button>
                    </Col>
          );
        })
      )}
      </Row>
      <Row className="justify-content-center">
        <Col xs={12}>
          <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={transformedEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '650px', width: '650px', margin: '0 auto' }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={(event) => {
              window.open(event.url, '_blank');
            }}
          />
          </div>
        </Col>
      </Row>

      </>
    );
  };
  
  export default Events;