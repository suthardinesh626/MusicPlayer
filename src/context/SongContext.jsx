import { useEffect, useState, useContext, createContext, Children } from "react";
import { songData } from '../Api/musicAPI'


const SongContext = createContext();


export const SongProvider = ({ children }) => {

    const [song, setSong] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log('This is context data:', song);
    
    useEffect(() => {
        const fetchSong = async () => {
            setLoading(true);
            const songItems = await songData()
            setSong(songItems)
            setLoading(false);
        }
        fetchSong();
    }, [])

    return (
        <SongContext.Provider value={{ song }} >
            {children}
        </SongContext.Provider>
    )
}

export const useSongContext = () => useContext(SongContext);




