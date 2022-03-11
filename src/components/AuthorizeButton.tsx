import Button from 'react-bootstrap/Button';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;


export const LoginButton = () => {

    const scopes = 'user-top-read'

    function loginToSpotify() {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${window.location.href}&scope=${scopes}`;
    }

    return (
        <Button style={{ backgroundColor: '#1DB954', borderColor: '#1DB954', width: '300px', height: '100px', fontSize: '30px' }}
        onClick={loginToSpotify}>
            Login using Spotify
        </Button>
    )

}