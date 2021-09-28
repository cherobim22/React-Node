import React from "react";
import Header from '../../components/Header'
import Produtos from '../../components/Produtos'
import './index.css'

export default function Home(){
    return(
        <div className="home-main">
            
            <Header title="Intelbras"/>
            <Produtos/>
          
        </div>
    )
}
