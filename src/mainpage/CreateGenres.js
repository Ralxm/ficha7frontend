import React, {useEffect, useState} from "react";
import axios from 'axios';
import '../index.css'

export default function CreateGenres(){
    const [Description, setDescription] = useState("");

    useEffect(() => {
        document.title = "Criação de géneros";
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
                            <th scope="col">Descrição</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th>
                                <input type="text" className="form-control" placeholder="Description"
                                    onChange={value => setDescription(value.target.value)}>
                                </input>
                            </th>
                            <th>
                                <button className='btn btn-info' onClick={CriarGenero}>Criar</button>
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

    function CriarGenero(){
        if (Description === "") {
            alert("Escolha a descrição!")
        }
        else {
            const datapost = {
                description: Description,
            }
            axios.post(url + "/genres/create", datapost)
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
}