import React, { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

const Detail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return
        const fetchDetail = async () => {
            setIsLoading(true);
            setError('');
            try {
                const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
                if (!response.ok) throw new Error('Failed to fetch movie details');
                const data = await response.json();
                setMovie(data)
            } catch (error) {
                console.error(error)
                setError('An error occurred while fetching movie details.');
            } finally {
                setIsLoading(false)
            }
        }
        fetchDetail()
    }, [id])

    if (isLoading) return <div className='wrapper'><p>Loading...</p></div>
    if (error) return <div className='wrapper'><p className='text-red-500'>{error}</p></div>
    if (!movie) return null;

  return (
    <main>
        <div className='wrapper'>
            <Link to='/'><p className='text-white '>Go back</p></Link>
            <div className='movie-card mt-6 flex flex-col md:flex-row gap-6'>
                <img className='w-2xs' src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} alt={movie.title} />
                <div className='text-center mt-6 text-left'>
                    <h2 className='text-4xl font-bold text-white'>{movie.title}</h2>
                    <p className='text-gray-100 text-1xl mt-6'>{movie.overview}</p>
                    <div className='content mt-6 flex flex-wrap gap-4'>
                    <span className='lang'>{movie.original_language}</span>
                    <span>•</span>
                    <span className='year'>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
                    <span>•</span>
                    <span className='rating font-bold'>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Detail