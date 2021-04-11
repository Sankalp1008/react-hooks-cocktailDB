import React,{useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import {Link} from'react-router-dom';

export default function SingleCocktail() {
  const {id}= useParams();
  const[loading,setLoading]= useState(false);
  const[cocktail,setCocktail]= useState(null);

  useEffect(()=>{
   setLoading(true);

   async function getCocktail(){
     try {
       const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
       const data = await response.json();
       if(data.drinks){
         const { strDrink: name,
           strDrinkThumb: image,
            strGlass:glass,
             strCategory: category,
              strInstructions: instructions,
              strAlcoholic:info,
               strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5 
              }=data.drinks[0];
              const ingredients= [strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5];

              const newCocktail = {name, category,image,glass,instructions,ingredients,info };
              setCocktail(newCocktail);
       }
       else{
         setCocktail(null);
       }
     } catch (error) {
       console.log(error);
      
     }
     setLoading(false);
   }
   getCocktail();
  },[id]);
 if (loading){
   return <h2 className="section-title">
     Loading...
   </h2>
 }

 if(!cocktail){
   return <h2 className="section-title">
     no cocktail to display
   </h2>
 }
 else{
   const {name,image,info,category,instructions,ingredients,glass}=cocktail;

  return (
  <section className="section cocktail-section">
    <Link to ="/" className="btn btn-primary">back home </Link>
    <h2 className="section-title">{name}</h2>
    <div className="drink">
    <img src={image} alt={name}/>
    <div className="drink-info">
      <p>name: {name}</p>
      <p>category: {category}</p>
      <p>info: {info}</p>
      <p>glass: {glass}</p>
      <p>instructions: {instructions}</p>  
      <p>ingredients: {""}
        {ingredients.map((item,index)=>{
          return item? <span key={index}>{item}</span> : null;
        })}
      </p>
        </div>
    </div>
    </section>
  );
 }
}
