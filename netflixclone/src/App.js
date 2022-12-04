import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import MovieTop from "./components/MovieTop";
import Header from "./components/Header";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [movieTop, setMovieTop] = useState([]);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista total

      let list = await Tmdb.getHomeList();
      console.log(list);
      setMovieList(list);

      // pegando filme em destaque

      let moviesOriginals = list.filter((item) => {
        return item.slug === "originals";
      });
      console.log(moviesOriginals);
      let randomChosen = Math.floor(
        Math.random() * (moviesOriginals[0].items.results.length - 1)
      );
      let movieChonsen = moviesOriginals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(movieChonsen.id, "tv");
      setMovieTop(chosenInfo);
    };
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {movieTop && <MovieTop item={movieTop} />}
      <section className="lists">
        {movieList.map((item, key) => {
          return <MovieRow key={key} title={item.title} items={item.items} />;
        })}
      </section> 
      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> pela B7Web
        Direitos de imagem para Netflix
        Dados retirados do site Themoviedb.org
      </footer>
    </div>
  );
};

// useEffect - quando a tela for carregada, a função que está dentro, será
// executada.

// Header
// Destaque
// Listas
// Rodapé basicão

// teste