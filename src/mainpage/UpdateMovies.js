import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../index.css'

export default function UpdateMovies(){
    let url = "https://ficha7backend.onrender.com"
    const {id} = useParams();
    const [Title, setTitle] = useState("");
    const [Photo, setPhoto] = useState("");
    const [Genre, setGenre] = useState("");
    const [Description, setDescription] = useState("");
    const [dataGenre, setdataGenre] = useState([]);

    useEffect(() => {
        if(id !== ""){
            axios.get(url + "/movies/get/" + id)
            .then(res => {
            if(res.data.success){
                const data = res.data.data[0];
                setTitle(data.title);
                setPhoto(data.photo);
                setDescription(data.description);
                setGenre(data.genre.description);
            }
            else{
                alert("Error web service")
            }
            })
            .catch(error => {
            alert("Erro " +  error)
            })
        }
        
        axios.get(url + "/genres/list")
        .then(res => {
            if (res.data.success){
                const data = res.data.data;
                setdataGenre(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro " + error)
        });
    }, []);

    useEffect(() => {
        document.title = "Filme: " + Title;
    }, [Title]);

    return(
        <div>
            <div className='row movies-box'>
                <div className='col-lg-1'>
                    
                </div>
                <div className='col-lg-10 movies-list-box'>
                <table className="table">
                    <thead className = "thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Título</th>
                            <th scope="col">Foto</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Género</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th>
                                <input type="text" className="form-control" id="idmovie" placeholder="ID" value={id} readOnly={true}>
                                </input>
                            </th>
                            <th>
                                <input type="text" className="form-control" id="titlemovie" placeholder="Titulo" value={Title} 
                                    onChange={(value)=> setTitle(value.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input type="text" className="form-control" id="fotomovie" placeholder="Path foto" value={Photo} 
                                    onChange={(value)=> setPhoto(value.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input type="text" className="form-control" id= "descriptionmovie" placeholder="Description" value={Description}
                                    onChange={value => setDescription(value.target.value)}>
                                </input>
                            </th>
                            <th>
                                <select id="inputState genremovie"
                                    className="form-control" value = {Genre}
                                    onChange={(value) => setGenre(value.target.value)}>
                                        <option defaultValue>Select..</option>
                                        <LoadGenre/>
                                </select>
                            </th>
                            <th>
                                <button type="submit" className='btn btn-info' onClick={Atualizar}>Atualizar</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div  className='col-lg-1'>

                </div>
            </div>
        </div>
    )

    function LoadGenre(){
        return dataGenre.map((data, index) => {
            return(
                <option key={index} value ={data.id}>{data.description}</option>
        )
        })
    }

    function Atualizar(){
        console.log("O ID DO FILME É " + Genre);
        const datapost = {
            title : Title,
            photo : Photo,
            description : Description,
            genreid : Genre
        }
        axios.put(url + "/movies/update/" + id, datapost)
        .then(response=>{
            if (response.data.success === true) {
                alert(response.data.message)
            }
            else {
                alert("Erro")
            }
        })
        .catch(error=>{
            alert("Erro: " + error)
        })
    }
}
