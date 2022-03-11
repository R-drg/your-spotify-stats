import { Image } from "react-bootstrap";

export const Home = (props: { spotifyData: SpotifyApi.CurrentUsersProfileResponse | null, topArtistsData: SpotifyApi.ArtistObjectFull[] }) => {
    const { spotifyData } = props;
    if(spotifyData) {
        return (
            <div>
                <h1>Welcome, {spotifyData.display_name}!</h1>
                {spotifyData.images ? <Image src={spotifyData.images[0].url} /> : null}
                <p>Followers: {spotifyData.followers?.total}</p>	
                <h2>Your Top Artists for this month</h2>
                <ul>
                    {props.topArtistsData.map((artist) => {
                        return <li key={artist.id}>{artist.name}</li>
                    })}
                </ul>
            </div>
        )
    }
    return (<></>);
    };
