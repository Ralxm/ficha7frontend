import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../index.css'
import CreateMovies from './CreateMovies';
import CreateGenres from './CreateGenres';
import ListMovies from './ListMovies';
import ListGenres from './ListGenre';
import UpdateMovies from './UpdateMovies';
import UpdateGenres from './UpgadeGenres';

function CreatePage(){
    return(
        <div className='container-fluid'>
            <Router>
                <CreateNav></CreateNav>
                <Routes>
                    <Route exact path='/' element={<ListMovies></ListMovies>}>
                    </Route>
                    <Route exact path='/list_movies' element={<ListMovies></ListMovies>}>
                    </Route>
                    <Route exact path='/list_genres' element={<ListGenres></ListGenres>}>
                    </Route>
                    <Route exact path='/create_movies' element={<CreateMovies></CreateMovies>}>
                    </Route>
                    <Route exact path='/create_genres' element={<CreateGenres></CreateGenres>}>
                    </Route>
                    <Route exact path='/update_movies/:id' element={<UpdateMovies></UpdateMovies>}>
                    </Route>
                    <Route exact path='/update_genres/:id' element={<UpdateGenres></UpdateGenres>}>
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}

function CreateNav(){
    return(
        <div className='row'>
                <div className='col-lg-12 col-xs-12 movies-nav'>
                    <div className='col-1 page-title'>
                        Cinemundo
                    </div>
                    <div className='col-4'>
                        <button className='btn btn-info botao-switch' onClick={() => window.location = '/list_movies'}>Mostrar Filmes</button>
                        <button className='btn btn-info botao-switch' onClick={() => window.location = '/list_genres'}>Mostrar Géneros</button>
                        <button className='btn btn-info botao-switch' onClick={() => window.location = '/create_movies'}>Criar Filmes</button>
                        <button className='btn btn-info botao-switch' onClick={() => window.location = '/create_genres'}>Criar Género</button>
                    </div>
                </div>
            </div>
    )
}

export default CreatePage;