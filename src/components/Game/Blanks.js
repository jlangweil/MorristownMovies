import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Spinner } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import axios from 'axios';
import './Blanks.css';

const Blanks = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);  
  const [blanks, setBlanks] = useState([]);
  const [userInputs, setUserInputs] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [story, setStory] = useState(null);
  const [showBlanks, setShowBlanks] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  
  useEffect(() => {
    const storedStories = sessionStorage.getItem('stories');
    if (storedStories) {
        setStories(JSON.parse(storedStories));
    } else {
        setIsLoading2(true);
        axios.patch(`${process.env.REACT_APP_API_URL}/games`, { 'getTitles': true }, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            }
        })
        .then(response => {
            setStories(response.data);
            sessionStorage.setItem('stories', JSON.stringify(response.data));
            setIsLoading2(false);
        })
        .catch(error => {
            console.error('Error fetching the story titles:', error);
            setIsLoading2(false);
        });
    }
}, []);


  const fetchBlanks = (storyId) => {
    setIsLoading(true);
    axios.patch(`${process.env.REACT_APP_API_URL}/games`, { storyId }, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        }
      })
      .then(response => {
        const fetchedBlanks = response.data;
        setBlanks(fetchedBlanks);
        setUserInputs(fetchedBlanks.reduce((inputs, blank) => {
          inputs[blank.blankid] = '';
          return inputs;
        }, {}));
      })
      .catch(error => {
        console.error('Error fetching the blanks:', error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false after completion
      });
  };

  const handleStoryChange = (event) => {
    setSelectedStory(event.target.value);
    fetchBlanks(event.target.value);
    setShowBlanks(true);
  };

  const handleInputChange = (event, blankId) => {
    setUserInputs({
      ...userInputs,
      [blankId]: event.target.value,
    });
  };

  const formatStory = (storyText) => {
    // Split the text into sentences
    const sentences = storyText.split('. ');
  
    // Initialize an array to hold the formatted paragraphs
    const paragraphs = [];
    
    // Initialize a new paragraph
    let paragraph = '';
    
    // Iterate over the sentences
    for (let sentence of sentences) {
      // If the sentence contains a quote and the paragraph is not empty, 
      // add the current paragraph to the paragraphs array and start a new one
      if (sentence.includes('"') && paragraph !== '') {
        paragraphs.push(paragraph);
        paragraph = '';
      }
      
      // Add the sentence to the current paragraph
      paragraph += sentence + '. ';
    }
    
    // Add the last paragraph to the paragraphs array
    paragraphs.push(paragraph);
    
    // Join the paragraphs together with two newline characters between each
    const formattedText = paragraphs.join('\n\n');
    
    return formattedText;
  }

  const handleButtonClick = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const emptyInputs = Object.values(userInputs).some(value => !value);

    if (emptyInputs) {
      setErrorMsg('Please fill all blanks before generating the story!');
    } else {
      setErrorMsg('');
      // Fetch the story
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/games`,
          { storyId: selectedStory, fetchStory: true },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            }
          }
        );
        const fetchedStory = response.data[0];
        let storyText = fetchedStory.storytext;
        for (let blank of blanks) {
          // Using a regular expression to replace all occurrences
          const regex = new RegExp(`\\{${blank.blankid}\\}`, 'g');
          // Sanitize the user's input
          const sanitizedInput = DOMPurify.sanitize(userInputs[blank.blankid]);
          // Format the user's input as bold and underlined
          const formattedInput = `<span style="font-weight: bold; text-decoration: underline;">${sanitizedInput}</span>`;
          storyText = storyText.replace(regex, formattedInput);
        }

        // Apply formatting to the story
        const formattedStory = formatStory(storyText);

        setStory(formattedStory);
        setShowBlanks(false); // Hide the blanks after generating the story
        setShowStory(true);
      } catch (error) {
        console.error('Error fetching the story:', error);
      }
      finally {
        setIsLoading(false); // Set loading to false after completion
      }
    }
  };

 

  if (showStory) {
    return (
        <div style={{
            whiteSpace: 'pre-line',
            color: 'black',
            padding: '50px',
            fontFamily: 'Times New Roman',
            fontSize: '28px',
            border: '2px solid black',
            borderRadius: '10px',
            backgroundColor: '#f3e9e0', // an off-white color similar to book pages
            boxShadow: '5px 5px 10px #888888',
            width: '60%',
            margin: '20px auto',
            lineHeight: '1.6'
          }} dangerouslySetInnerHTML={{ __html: story }}>
          </div>
    );
  }

  return (
    <>
        <Form.Control
    as="select"
    onChange={handleStoryChange}
    style={{
        width: '300px',
        backgroundColor: 'black',
        color: 'white',
        borderColor: 'white',
        borderRadius: '5px',
        margin: '20px auto',
        display: 'block',
        appearance: 'none',
        padding: '10px',
        backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' fill=\'%23ffffff\'><polygon points=\'0,0 20,0 10,20\'/></svg>")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.7em top 50%',
        backgroundSize: '1.25em'
    }}>
    {isLoading2 ? (
        <option>Loading...</option>
    ) : (
        <>
            <option>Select a story</option>
            {stories.map(story => (
                <option key={story.storyid} value={story.storyid}>{story.title}</option>
            ))}
        </>
    )}
</Form.Control>


        {isLoading ? (
            <div style={{ textAlign: 'center', margin: '20px' }}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        ) : (
            showBlanks && (
                <Form style={{ width: '50%', margin: 'auto' }}>
                    {blanks.map(blank => (
                        <Form.Group key={blank.blankid} style={{ position: 'relative', height: '80px', margin: '20px 0' }}>
                            <FormControl
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    outline: 'none',
                                    boxShadow: 'none',
                                    border: 'none',
                                    borderBottom: '3px solid white',
                                    textAlign: 'center',
                                    fontSize: '20px',
                                    fontFamily: 'Cursive, Helvetica',
                                }}
                                value={userInputs[blank.blankid] || ''}
                                onChange={event => handleInputChange(event, blank.blankid)}
                            />
                            <Form.Label style={{ position: 'absolute', top: '50px', width: '100%', textAlign: 'center' }}>{blank.prompt}</Form.Label>
                        </Form.Group>
                    ))}
                    <center><Button onClick={handleButtonClick}>Generate Story</Button></center>
                    {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                </Form>
            )
        )}

        {showStory && (
            <div className="story-container" dangerouslySetInnerHTML={{ __html: story }}>
            </div>
            
        )}
    </>
);


};

export default Blanks;
