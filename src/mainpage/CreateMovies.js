import React, {useEffect, useState} from "react";
import axios from 'axios';
import '../index.css'

export default function CreateMovies(){
    const [Title, setTitle] = useState("");
    const [Photo, setPhoto] = useState("");
    const [Genre, setGenre] = useState("");
    const [Description, setDescription] = useState("");
    const [dataGenre, setdataGenre] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/genres/list")
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setdataGenre(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })
        document.title = "Criação de filmes";
    }, []);

    return(
        <div>
            <div className='row movies-box'>
                <div className='col-lg-1'>
                    
                </div>
                <div className='col-lg-10 movies-list-box'>
                <table className="table">
                    <thead className = "thead-dark">
                        <tr>
                            <th scope="col">Título</th>
                            <th scope="col">Foto</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Género</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th>
                                <input type="text" className="form-control" placeholder="Titulo" value={Title} 
                                    onChange={(value)=> setTitle(value.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input type="text" className="form-control" placeholder="Path foto" value={Photo} 
                                    onChange={(value)=> setPhoto(value.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input type="text" className="form-control" placeholder="Description"
                                    onChange={value => setDescription(value.target.value)}>
                                </input>
                            </th>
                            <th>
                                <select id="inputState" className="form-control" value = {Genre} onChange={(value) => setGenre(value.target.value)}>
                                        <option defaultValue>Select..</option>
                                        <LoadGenre/>
                                </select>
                            </th>
                            <th>
                                <button className='btn btn-info' onClick={CriarFilme}>Criar</button>
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

    function CriarFilme(){
        const datapost = {
            title: Title,
            photo: Photo,
            description: Description,
            genreid: Genre
        }
        axios.post("http://localhost:3001/movies/create", datapost)
        .then(response => {
            if (response.data.success===true) {
                    alert(response.data.message)
            }
            else {
                    alert(response.data.message)
            }
        })
        .catch(error=>{
            alert("Erro: " + error)
         });
    }
}
