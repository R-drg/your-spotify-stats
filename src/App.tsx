import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import './App.css';
import { LoginButton } from './components/AuthorizeButton';
import { Home } from './components/Home';


const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI
  })

function App() {

  function getHashValue(key:string) {
    // eslint-disable-next-line no-restricted-globals
    var matches = location.hash.match(new RegExp(key+'=([^&]*)'));
    return matches ? matches[1] : null;
  }
 
  const [data, setData] = useState<SpotifyApi.CurrentUsersProfileResponse | null>(null);

  const [topArtists, setTopArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);

  const [loading, setLoading] = useState(false);

  const [accessToken, setAccesstoken] = useState(getHashValue('access_token'));


  useEffect(() => {
    if (!accessToken) {
      return;
    }
    spotifyApi.setAccessToken(accessToken);
    setLoading(true);
    spotifyApi.getMe().then((data) => {
      setData(data.body);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
      setAccesstoken(null);
    });
    spotifyApi.getMyTopArtists({ time_range: 'short_term' }).then((data) => {
      console.log(data);
      setTopArtists(data.body.items);
    });
  },[accessToken]);

  return (
    <Container className='h-100'>
      <Row className='justify-content-center'>
        <Col xs='auto'>
          <h1>
            Welcome to Spotify Tool!
          </h1>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}
        className={accessToken ? '' : 'h-100 justify-content-center align-items-center'}>
          <Col xs="auto">
          {loading ? <></> : accessToken && data ? <Home topArtistsData={topArtists} spotifyData={data}/> : <LoginButton />}
        </Col >
        </Row>
      </Container>
  );
}

export default App;
