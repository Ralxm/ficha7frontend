import React, { useState, useEffect } from 'react';
import '../index.css'
import axios from 'axios';

export default function ListMovies(){

    const [Genre, setMovie] = useState([]);

    useEffect(() => {
        document.title = "Géneros de filmes";
        loadGenres();
    }, []);
    
    function loadGenres(){
        const url = "http://localhost:3001/genres/list";
        axios.get(url)
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setMovie(data);
            }
            else {
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        });
    }

    return(
        <div>
            <div className='row movies-box'>
                <div className='col-lg-1 movies-filler'>
                    
                </div>
                <div className='col-lg-10 movies-list-box'>
                <table className="table">
                    <thead className = "thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        <GenreRows></GenreRows>
                    </tbody>
                </table>
                </div>
                <div  className='col-lg-1'>

                </div>
            </div>
        </div>
        
    )

    function GenreRows(){
        return Genre.map((data, index)=>{
            return(
                <tr key={index}>
                    <th>{data.id}</th>
                    <td>{data.description}</td>
                    <td>
                        <button className='btn btn-info' onClick={() => window.location = '/update_genres/' + data.id}>Editar</button>
                    </td>
                    <td>
                        <button className='btn btn-danger' onClick={() => Apagar(data.id)}>Apagar</button>
                    </td>
                </tr>
            )
        })
    }

    function Apagar(genre){
        axios.put("http://localhost:3001/genres/delete/" + genre)
        .then(response =>{
            alert("Género Apagado!");
            loadGenres();
        })
        .catch (error => {
            alert("Erro: " + error)
        });
    }
}


