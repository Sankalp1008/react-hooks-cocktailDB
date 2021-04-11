import React,{useState,useEffect}from "react";
import CocktailList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';


export default function Home() {
  const [loading,setLoading]= useState(false);
  const [searchTerm,setsearchTerm]= useState('d');
  const [cocktails,setCocktails]= useState([]);
 useEffect(()=>{
   async function getDrinks(){
     setLoading(true);
     try{
       const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
       const data = await response.json();
       const {drinks} = data;
       if (drinks){
         const newCocktail= drinks.map(item=>{
           const {idDrink,strDrink,strDrinkThumb,strAlcoholic,strGlass}=item;
           return {id:idDrink,name:strDrink, image:strDrinkThumb, info: strAlcoholic, glass:strGlass}
         });
         setCocktails(newCocktail);
       } 
       else{
         setCocktails([]);
       }
      } catch(error){
         
       }
    setLoading(false);
    }
   getDrinks();
   },[searchTerm]);

return (<main>
    <SearchForm setsearchTerm={setsearchTerm}/>
    <CocktailList loading={loading} cocktails={cocktails}/>
  </main>
  );
}
