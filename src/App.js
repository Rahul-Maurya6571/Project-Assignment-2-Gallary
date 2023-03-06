
import { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const searchData = useRef(null)
  const [searchText,setSearchText] = useState("mountains")
  const [imageData,setImageData] = useState([])
  useEffect(()=>{
    //method key cat/mountains / sort /per_page/format of data XML/json
    const params={
      method:"flickr.photos.search",
      api_key:"58c2d0c018dedee5c0458d678fd8f632",
      text:searchText,
      sort:"",
      per_page:45,
      license:'4',
      extras:"owner_name, license",
      format:'json',
      nojsoncallback:1
    }
const parameters = new URLSearchParams(params);
const url=`https://api.flickr.com/services/rest/?${parameters}`
axios.get(url).then((resp)=>{
  const arr = resp.data.photos.photo.map((imgData)=>{
  
return fetchflickrImageUrl(imgData, 'q')

  })
  setImageData(arr)
}).catch(()=>{

}).finally(()=>{

})

  },[searchText])
  const fetchflickrImageUrl = (photo,size) =>{
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if(size){
      url +=`_${size}`
    }
    url += '.jpg'
    return url
  }
  return (
    <>
    <div className="App">
      <h1>Snapshot</h1>
    <input className="input"onChange={(e)=>{searchData.current = e.target.value}}  placeholder='search...'/>
    <button onClick={()=>{setSearchText(searchData.current)}} className='main'>Search</button>
    <section className='box'>
      <h2 className='search-image'>{searchText} Pictures</h2>
      <button className='main' onClick={()=>setSearchText("mountain")}>Mountain</button>
      <button  className='main' onClick={()=>setSearchText("beaches")}>Beaches</button>
      <button className='main' onClick={()=>setSearchText("birds")}>Birds</button>
      <button  className='main' onClick={()=>setSearchText("food")}>Food</button>
    </section>
    <section className='container'>
      
        {imageData.map((imageurl,key)=>{
          return (
            <article className='image'>
              <img src={imageurl} key = {key } />
            </article>
          )

        })}
    
    </section>
    </div>
    </>
  );
}

export default App;
