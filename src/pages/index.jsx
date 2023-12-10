import { Auth } from '../components/auth.jsx';
import { LikeButton } from '../components/likeButton.jsx';
import { LogoutButton } from '../components/logoutButton.jsx';
import { useCookies } from 'react-cookie';
import React, { useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { pink, grey } from '@mui/material/colors';


const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#000000',
    },
  },
});

const style = {
  border: '1px solid #000',
  borderRadius: '5px',
  bgcolor: '#8EE4AF'
};

export default function Index(props) {
  const [cookies, setCookies] = useCookies();

  const preparedCookies = useMemo(() => {
    return cookies.token ? cookies : props.cookies;
  }, [cookies, props.cookies]);


  const [events, setEvents] = useState(props.events)
  const [sortEvents, setSortEvents] = useState(events)
  const [liked, setLiked] = useState(true)
  const [search, setSearch] = useState('');
  // const [value, setValue] = useState(2);
  const [id, setId] = useState(preparedCookies.id ?? '')

  useEffect(() => {
    axios.get('http://localhost:3000/api/getEvents', { params: { userId: id } })
      .then(res => {
        setEvents(res.data.events)
        setSortEvents(res.data.events)
        setLiked(true)
        setSearch('')
      })
      .catch(err => console.log(err))
  }, [id])

  const changeLiked = (eventId) => {
    const newEvents = events.map(e => e.id == eventId ? { ...e, liked: !e.liked } : e)
    setEvents(newEvents)
    setSortEvents(newEvents)
    setLiked(true)
    setSearch('')
  }

  const filter = (e) => {
    setSearch(e.target.value)
    const s = e.target.value
    if (s === '') {
      setSortEvents(events)
      return
    }
    const filteredList = events.filter(function (item) {
      return item.name.toLowerCase().search(s.toLowerCase()) !== -1;
    });
    setSortEvents(filteredList);
  }



  const showLiked = () => {
    setLiked(!liked)
    setSortEvents(events.filter(e => !liked || !!e.liked))
  }

  // useEffect(() => {
  //   setCookies('id', props.cookies.id || '');
  //   setCookies('name', props.cookies.name || '');
  //   setCookies('token', props.cookies.token || '');
  // }, [props.cookies]);


  return (
    <div className="App">
      <div className='head'>

        {id ? <LogoutButton setId={setId} /> : <Auth setId={setId} />}

        <div className='search'>
          <SearchIcon></SearchIcon>
          <div className='searchField'>
            <Box
              sx={{
                width: '100%',
                maxWidth: '100%',
              }}
            >
              <div className='text'>
                <ThemeProvider theme={theme}>
                  <TextField fullWidth label="Поиск" id="fullWidth" variant="standard" onChange={filter} value={search} />
                </ThemeProvider>
              </div>
            </Box>
          </div >
          {id !== '' && <div className='favoriteButton'>
            <Box >
              <BottomNavigation
                sx={style}
                showLabels
                // value={value}
                onClick={showLiked}
              >
                <BottomNavigationAction label={preparedCookies.name} icon={<FavoriteIcon sx={{ color: (!liked ? pink[500] : grey[500]) }} />} />
              </BottomNavigation>
            </Box>
          </div>}

        </div >
      </div>


      <div className='main'>


        {
          sortEvents.map((event) => {
            return (
              <div key={event.id} className='eventCard'>
                <a href={event.link}>
                  <div className='eventName'>
                    <h2>{event.name}</h2>
                  </div>
                </a>
                {id != '' && (
                  <LikeButton id={event.id} user={id} liked={!!event.liked} changeLiked={changeLiked}></LikeButton>
                )}
              </div>

            )
          })
        }
      </div>
    </div>

  );
};

export const getServerSideProps = async (context) => {
  const userId = context.req.cookies.id
  console.log(userId)
  const response = await axios.get('http://localhost:3000/api/getEvents', { params: { userId } }).catch(err => console.log(err))

  return {
    props: { cookies: context.req.cookies, events: response.data.events }
  }
}




