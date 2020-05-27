import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from "./components/Card";
import "./App.css"

const mainStyle = {
    backgroundColor: "#2d3436",
    backgroundImage: "linear-gradient(315deg, #2d3436 0%, #000000 74%)",
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 0,
    padding: 0,
};

const titleStats = {
    color: "white",
    fontFamily: "monospace",
    margin: "5% auto",
    textAlign: "center",
};

function App() {
    const [data, setData] = useState({
        Countries: []
    });
    const [info, setInfo] = useState({})

    useEffect(() => {
        axios
            .get("https://api.covid19api.com/summary")
            .then((response) => {
                setData(response.data)
                console.log(response.data["Global"])
                setInfo(response.data["Global"])
            })
    }, [] );



    const handleChange = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        let countryInfo = null
        data.Countries.forEach(item => {
            if(item.Country === event.target.value)
                countryInfo = item
        })
        setInfo(countryInfo)
    }

    console.log(info)

    return (
        <div style={mainStyle}>
            <h1 style={titleStats}>Coronavirus Stats</h1>
            <select onChange={handleChange} style={{display: "block", margin: "5% auto", fontSize: 24, fontFamily: "monospace"}}>
                <option value="Global">Global</option>
                {
                    data["Countries"].map(item => <option value={item["Country"]}>{item["Country"]}</option> )
                }
            </select>
            <div style={{display: "table", margin:"0 auto"}} id="cardDiv">
                <Card type="Confirmati" number={info["TotalConfirmed"]}/>
                <Card type="Decedati" number={info["TotalDeaths"]}/>
                <Card type="Recuperati" number={info["TotalRecovered"]}/>
            </div>
            <h5 style={{position: "absolute", bottom: 20, left: 10}}>Ultima actualizare: {data.Date}</h5>
        </div>
    );
}

export default App;
