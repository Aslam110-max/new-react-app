import React, { useEffect, useState } from "react";

import { ClipLoader } from 'react-spinners';
import { getDocs, collection,addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Database() {
  const databaseRef = collection(db, "movies");
  const [movieList, setMovieList] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [movieYear, setMovieYear] = useState(0);
  const [isNew, setIsNew] = useState(false);
  useEffect(() => {
    getData();
  },[]);
  const getData = async () => {
    try {
      const data = await getDocs(databaseRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(
       filteredData
      );
      console.log(movieList);
    } catch (err) {
      console.error(err);
    }
  };
  const uploadMovie=async()=>{
    try {
        await addDoc(databaseRef,{
            name:movieTitle,
            year:movieYear,
            isNew:isNew

        });
       await getData();
    } catch (error) {
        
    }
  }
  return <center>
    <div>
   
    {movieList.length>0? movieList.map((movie)=><div key={movie.id}>
        <h1 style={{color:movie.isNew? "green":"red"}}>
            {movie.name}
        </h1>
        <h3>
            {movie.year}
        </h3>
        <h3>
            {movie.id}
        </h3>
    </div>): <ClipLoader color="#36D7B7" loading={true}  size="50px" />}
    <div style={{paddingBottom:"50px"}}>
        <input placeholder="movie title" onChange={(e)=>setMovieTitle(e.target.value)}></input>
        <input placeholder="movie year" onChange={(e)=>setMovieYear(Number(e.target.value))}></input>
        <input type="checkbox" checked={isNew} onChange={(e)=>setIsNew(e.target.checked)}></input>
        <label >Is New</label>
        <button onClick={uploadMovie} > Upload Movie</button>
    </div>
  </div>
  </center>;
}
