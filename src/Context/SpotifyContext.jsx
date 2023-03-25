import {useState, createContext} from "react";

const SpotifyContext = createContext();

const PORT = 'http://localhost:3001'
const BASE_URL = 'https://api.spotify.com/v1'

const SpotifyProvider = ({children}) => {
    const [songs, setSongs] = useState([]);
    const [songTableCoverImage, setSongTableCoverImage] = useState({});
    const [songType, setSongType] = useState('');
    const [loading, setLoading] = useState(false);
    const [hamburgerOptions, setHamburgerOptions] = useState([]);
    const [currentPlayingSong, setCurrentPlayingSong] = useState({})
    const [savedPlaylists, setSavedPlaylists] = useState([])

    async function fetchFunction(ENDPOINT, METHOD){
        let access_token = null;

        try {
            //GET TOKEN
            const token = await fetch(PORT + '/get_access_token');
            const objToken = await token.json();
            access_token = objToken.access_token;
            
            // REQUEST
            let options = {
                method: METHOD,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + access_token
                }
            }
            const data = await fetch(BASE_URL + ENDPOINT, options);
            const obj = await data.json();
            return obj;

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SpotifyContext.Provider 
            value={{
                fetchFunction,
                songs,
                setSongs,
                songType,
                setSongType,
                loading,
                setLoading,
                hamburgerOptions,
                setHamburgerOptions,
                currentPlayingSong,
                setCurrentPlayingSong,
                songTableCoverImage,
                setSongTableCoverImage,
                savedPlaylists,
                setSavedPlaylists
            }}>
            {children}
        </SpotifyContext.Provider>
    )
}

export {SpotifyProvider, SpotifyContext};