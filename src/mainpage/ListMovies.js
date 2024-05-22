import React, { useState, useEffect } from 'react';
import '../index.css'
import axios from 'axios';

export default function ListMovies(){
    const url = "http://localhost:3001";
    const [Movie, setMovie] = useState([]);

    useEffect(() => {
        document.title = "Filmes disponíveis";
        loadMovies();
    }, []);
    
    function loadMovies(){
        axios.get(url + "/movies/list")
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setMovie(data);
            }
            else {
                alert("Erro Web Service!");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        });
    }

    return(
        <div>
            <div className='row movies-box'>
                <div className='col-lg-1'>
                    
                </div>
                <div className='col-lg-10 movies-list-box'>
                    <MovieRows></MovieRows>
                </div>
                <div  className='col-lg-1'>

                </div>
            </div>
        </div>
    )

    

    function MovieRows(){
        const addDefaultImg = ev => {
            ev.target.src = "./logo192.png"
        }

        return Movie.map((data, index)=>{
            return(
                <div className='col-lg-4 movie-box container-fluid'>
                    <div className='row col-lg-12 movie-image container-fluid'>
                        <img alt = 'Não tem imagem' style = {{width: '150px', height: '80px' }} src={data.photo} onError={addDefaultImg}/>
                    </div>
                    <div className='row col-lg-12 container-fluid'>
                        <span className='movie-title'>
                            {data.title}
                        </span>
                    </div>
                    <div className='row col-lg-12 container-fluid'>
                        <span className='movie-info'>{data.description}</span>
                        <span className='movie-info'>{data.genre.description}</span>
                    </div>
                    <div className='row col-lg-12 container-fluid movie-button'>
                        <span className='movie-info'>ID: {data.id}</span>
                        <button className='btn btn-info' style={{width: '30%'}} onClick={() => window.location = '/update_movies/' + data.id}>Editar</button>
                        <button className='btn btn-danger' style={{width: '30%'}} onClick={() => Apagar(data.id)}>Apagar</button>
                    </div>
                </div>
            )
        })
    }

    function Apagar(movie){
    axios.put(url + "/movies/delete/" + movie)
    .then(response =>{
            if (response.data.success) {
                alert("Filme apagado com sucesso");
                loadMovies();
            }
        })
        .catch ( error => {
            alert("Erro " + error)
        });
    }
}


