import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../index.css'

export default function UpdateGenres(){
    let url = "https://ficha7backend.onrender.com/"
    const {id} = useParams();
    const [description, setDescription] = useState("");

    useEffect(() => {
        if(id !== ""){
            axios.get(url + "genres/get/" + id)
            .then(res => {
            if(res.data.success){
                const data = res.data.data[0];
                setDescription(data.description);
            }
            else{
                alert("Error web service")
            }
            })
            .catch(error => {
            alert("Erro " +  error)
            })
        }
    }, []);

    useEffect(() => {
        document.title = "Género: " + description;
    }, [description]);

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
                            <th scope="col">Descrição</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th>
                                <input type="text" className="form-control" placeholder="ID" value={id} readOnly={true}>
                                </input>
                            </th>
                            <th>
                                <input type="text" className="form-control" placeholder="Description"
                                    onChange={value => setDescription(value.target.value)} value={description}>
                                </input>
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

    function Atualizar(){
        const datapost = {
            description : description,
        }
        axios.put(url + "/genres/update/" + id, datapost)
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
