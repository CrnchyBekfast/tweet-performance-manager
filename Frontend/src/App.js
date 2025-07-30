import logo from './logo.png';
import React from 'react';
import './App.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

function App() {
  const [value, setValue] = React.useState(0);
  const [selectedDateTime, setSelectedDateTime] = React.useState(
    new Date().toISOString().slice(0, 16)
  );
  const [tweetType, setTweetType] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [tweetText, setTweetText] = React.useState('');
  const [mediaType, setMediaType] = React.useState('[Photo(media_link)]');
  const [predictedLikes, setPredictedLikes] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Generate card state variables
  const [company, setCompany] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [generatedTweetText, setGeneratedTweetText] = React.useState('');
  const [generatedPredictedLikes, setGeneratedPredictedLikes] = React.useState(null);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDateTimeChange = (event) => {
    setSelectedDateTime(event.target.value);
  };

  const handleTweetTypeChange = (event) => {
    setTweetType(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleTweetTextChange = (event) => {
    setTweetText(event.target.value);
  };

  const handleMediaTypeChange = (event) => {
    setMediaType(event.target.value);
  };

  const API1_BASE = process.env.REACT_APP_API1_URL || "http://localhost:8000";

  const predict = (username, tweetText, mediaType, dateTime) => {
    setIsLoading(true);
    console.log('Making predict request to /predict...');
    fetch(`${API1_BASE}/predict?`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: dateTime,
        content: tweetText,
        username: username,
        media: mediaType
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // parse the JSON from response
    })
    .then(data => {
      console.log('API response:', data);
      // Extract predicted_value from the response
      if (data.predicted_value !== undefined) {
        setPredictedLikes(data.predicted_value);
      }
    })
    .catch(error => {
      console.error('API call failed:', error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const API2_BASE = process.env.REACT_APP_API2_URL || "http://localhost:8001";

  const generate = (company, topic, message, tweetType) => {
    setIsLoading(true);
    console.log('Making generate request to /generate_predict...');
    
    // Build query parameters
    const params = new URLSearchParams({
      company: company,
      topic: topic,
      message: message,
      tweet_type: tweetType
    });
    
    fetch(`${API2_BASE}/generate_predict?${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // parse the JSON from response
    })
    .then(data => {
      console.log('Generate API response:', data);
      // Extract the generated tweet and predicted likes from the response
      if (data.tweet !== undefined) {
        setGeneratedTweetText(data.tweet); // Update the generated tweet text
      }
      if (data.prediction !== undefined) {
        setGeneratedPredictedLikes(data.prediction); // Update generated predicted likes
      }
    })
    .catch(error => {
      console.error('Generate API call failed:', error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const renderActiveCard = () => {
    if (value === 0) {
      // Predict tab content
      return (
        <Card sx={{ width: '35%', backgroundColor: '#2a2a2a', color: 'white' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Predict
            </Typography>
            
            <FormControl sx={{ width: '100%', marginTop: 2 }}>
              <FormLabel sx={{ color: '#b0b0b0', marginBottom: 1 }}>Username</FormLabel>
              <TextField 
                id="outlined-basic" 
                variant="outlined" 
                required
                value={username}
                onChange={handleUsernameChange}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }} 
              />
            </FormControl>

            <FormControl sx={{ width: '100%', marginTop: 2 }}>
              <FormLabel sx={{ color: '#b0b0b0', marginBottom: 1 }}>Tweet</FormLabel>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                required
                value={tweetText}
                onChange={handleTweetTextChange}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
            </FormControl>

            <FormControl
              sx={{
                marginTop: 2,
                width: '100%',
                '& .MuiFormLabel-root': {
                  color: '#b0b0b0',
                },
                '& .MuiFormControlLabel-root': {
                  color: 'white',
                },
                '& .MuiRadio-root': {
                  color: 'white',
                },
                '& .Mui-checked': {
                  color: 'white',
                },
              }}
            >
              <FormLabel id="demo-row-radio-buttons-group-label">Media</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={mediaType}
                onChange={handleMediaTypeChange}
                required
              >
                <FormControlLabel value="[Video(media_link)]" control={<Radio />} label="Video" />
                <FormControlLabel value="[Photo(media_link)]" control={<Radio />} label="Photo" />
                <FormControlLabel value="[Gif(media_link)]" control={<Radio />} label="GIF" />
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ width: '100%', marginTop: 2 }}>
              <FormLabel sx={{ color: '#b0b0b0', marginBottom: 1 }}>Date & Time</FormLabel>
              <TextField
                type="datetime-local"
                value={selectedDateTime}
                onChange={handleDateTimeChange}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& input[type="datetime-local"]::-webkit-calendar-picker-indicator': {
                    filter: 'invert(1)',
                  },
                }}
              />
            </FormControl>

            <Button 
              variant="contained" 
              onClick={() => predict(username, tweetText, mediaType, selectedDateTime)}
              disabled={isLoading}
              sx={{
                marginTop: 3,
                backgroundColor: '#90caf9',
                color: '#1e1e1e',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#64b5f6',
                },
                height: '48px',
              }}
            >
              {isLoading ? 'Predicting...' : 'Predict'}
            </Button>
          </CardContent>
        </Card>
      );
    } else {
      // Generate tab content
      return (
        <Card sx={{ width: '35%', backgroundColor: '#2a2a2a', color: 'white', marginBottom: 4 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Generate
            </Typography>
            
            <FormControl sx={{ width: '100%', marginTop: 2 }}>
              <FormLabel sx={{ color: '#b0b0b0', marginBottom: 1 }}>Company</FormLabel>
              <TextField 
                variant="outlined" 
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }} 
              />
            </FormControl>

            <FormControl sx={{ width: '100%', marginTop: 2 }}>
              <FormLabel sx={{ color: '#b0b0b0', marginBottom: 1 }}>Topic</FormLabel>
              <TextField
                variant="outlined"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
            </FormControl>

            <FormControl sx={{ width: '100%', marginTop: 2 }}>
              <FormLabel sx={{ color: '#b0b0b0', marginBottom: 1 }}>Message</FormLabel>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
            </FormControl>

            <FormControl sx={{ width: '100%', marginTop: 2 }}>
              <FormLabel sx={{ color: '#b0b0b0', marginBottom: 1 }}>Tweet Type</FormLabel>
              <Select
                value={tweetType}
                onChange={handleTweetTypeChange}
                displayEmpty
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '& .MuiSelect-select': {
                    color: 'white',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white',
                  },
                }}
              >
                <MenuItem value="">
                  <em>Select tweet type</em>
                </MenuItem>
                <MenuItem value="general">General</MenuItem>
                <MenuItem value="announcement">Announcement</MenuItem>
                <MenuItem value="question">Question</MenuItem>
              </Select>
            </FormControl>

            <Button 
              variant="contained" 
              onClick={() => generate(company, topic, message, tweetType)}
              disabled={isLoading}
              sx={{
                marginTop: 3,
                backgroundColor: '#90caf9',
                color: '#1e1e1e',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#64b5f6',
                },
                height: '48px',
              }}
            >
              {isLoading ? 'Generating...' : 'Generate and Predict'}
            </Button>
          </CardContent>
        </Card>
      );
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Box 
          sx={{
          '& .MuiTab-root': {
          color: 'white',
          textTransform: 'none',
        },
        '& .Mui-selected': {
          color: '#90caf9', // optional: different color for selected tab
        },
        '& .MuiTabs-indicator': {
          height: '3px',
          borderRadius: '3px',
        },
      width: '100%', // Full width to center tabs across the entire screen
      display: 'flex',
      justifyContent: 'center', // Center the tabs horizontally
      }}
        >
          <Tabs
           value={value} 
           onChange={handleChange} 
           centered
           slotProps={{
            indicator: {
              sx: {
                width: '80%',
              },
            },
           }}
           >
          <Tab label="Predict" sx={{ mx: 3, minWidth: '200px' }}/>
          <Tab label="Generate" sx={{ mx: 3, minWidth: '200px' }} />
        </Tabs>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', width: 'calc(100% - 64px)', margin: '32px 32px 0 32px', gap: 2 }}>
          {renderActiveCard()}
          
          <Card sx={{ flex: 1, backgroundColor: '#000000', color: 'white', marginLeft:'20%' }}>
            <CardContent>
              <Typography variant="h7" component="div">
                𝕏 preview
              </Typography>
              <hr style={{ border: '1px solid #444', margin: '16px 0' }} />
              <div class="tweet">
                <div class="tweet-avatar">
                  <img src="/company_image.png" class="avatar" alt="Avatar" />
                </div>
                
                <div class="tweet-content">
                  <div class="tweet-header">
                    <div class="user-info" style={{fontSize: '0.95rem'}}>
                      <span class="name" style={{color: 'white', fontSize:'1.1rem'}}>
                        <strong>{value === 0 ? (username || 'Tweeter') : (company || 'Company')}</strong>
                      </span>
                      <img style= {{width: '20px', height: '20px', verticalAlign: 'middle', marginRight: '3px'}}src="/verified.png" alt="verified" className="verified-icon" />
                      <span class="username">
                        @{value === 0 ? (username ? username.toLowerCase().replace(/\s+/g, '') : 'tweeter') : (company ? company.toLowerCase().replace(/\s+/g, '') : 'company')}
                      </span>
                      <span class="dot" style={{fontSize: '2rem', verticalAlign:'middle', lineHeight:1, margin:' 0 4px'}}><strong>·</strong></span>
                      <span class="time">now</span>
                    </div>
                  </div>

                  <div class="tweet-text" style={{fontSize:'1.1rem', marginTop:'2px', marginBottom:'16px'}}>
                    {value === 0 ? (tweetText || 'Tweet Text here') : (generatedTweetText || 'Generated tweet will appear here')}
                  </div>

                  <div class="tweet-media" >
                    {mediaType === '[Video(media_link)]' ? (
                      <video autoPlay loop controls muted style={{height:'54%', width: '96%', borderRadius: '2%'}}>
                        <source src="/meme.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : mediaType === '[Gif(media_link)]' ? (
                      <img src="/meme.gif" class="media-thumbnail" style={{height:'54%', width: '96%', borderRadius: '2%'}} alt="GIF"/>
                    ) : (
                      <img src="/meme.jpg" class="media-thumbnail" style={{height:'54%', width: '96%', borderRadius: '2%'}} alt="Photo"/>
                    )}
                  </div>

                  <hr style={{ border: '1px solid #444', margin: '16px 0' }} />

                  <div class="tweet-actions">
                    <div class="left-icons">
                      <i className="fa-regular fa-comment"></i>
                      <i className="fa-solid fa-retweet"></i>
                      {(value === 0 ? predictedLikes : generatedPredictedLikes) ? (
                        <i className="fa-solid fa-heart" style={{color: '#f91880'}}>
                          <span style={{marginLeft: '8px', fontFamily:'sans-serif', fontSize: '0.9rem', color: '#f91880'}}>
                            {value === 0 ? predictedLikes : generatedPredictedLikes}
                          </span>
                        </i>
                      ) : (
                        <i className="fa-regular fa-heart"><span style={{marginLeft: '30%', fontFamily:'sans-serif', fontSize: '0.9rem'}}></span></i>
                      )}
                      <i className="fa-regular fa-eye"></i>
                    </div>

                    <div class="right-icons">
                      <i className="fa-regular fa-bookmark"></i>
                      <i className="fa-solid fa-arrow-up-from-bracket"></i>
                    </div>
                  </div>
                </div>  
              </div>
            </CardContent>
          </Card>
        </Box>
      </header>

      <footer className="App-footer" style={{ backgroundColor: '#1e1e1e', padding: '20px 0', color: 'white', position: 'relative', bottom: 0, width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ marginBottom: '10px' }}>
            <a href="https://github.com/CrnchyBekfast/tweet-performance-manager" target="_blank" rel="noopener noreferrer" style={{ color: '#888888', fontSize: '32px', textDecoration: 'none' }}>
              <i className="fab fa-github"></i>
            </a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer" style={{ color: '#888888', fontSize: '24px', textDecoration: 'none' }}>
              <i className="fab fa-react"></i>
            </a>
            <a href="https://www.figma.com" target="_blank" rel="noopener noreferrer" style={{ color: '#888888', fontSize: '24px', textDecoration: 'none' }}>
              <i className="fab fa-figma"></i>
            </a>
            <a href="https://www.python.org" target="_blank" rel="noopener noreferrer" style={{ color: '#888888', fontSize: '24px', textDecoration: 'none' }}>
              <i className="fab fa-python"></i>
            </a>
          </div>
        </div>
        <Typography variant="body2" color="white" align="center">
          © 2025 Tweet Predictor Generator. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
}

export default App;
