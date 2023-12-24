import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {

  const[articles,setArticles] = useState([]);
  const[loading,setLoading] = useState(true);
  const[page,setPage] = useState(1);
  const[totalResults,settotalResults] = useState(0);

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3a3bccea7bf9445aa8f89dd63eec8b2c&pagesize=${props.pagesize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles);
    settotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(()=> {
    updateNews();
    document.title = `NewsLine Express - ${capitalize(props.category)}`;
    //eslint-disable-next-line
  },[])

  //const handlePrevClick = async () => {
  //  props.setProgress(10);
  //  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3a3bccea7bf9445aa8f89dd63&//pagesize=${props.pagesize}`;
  //  setLoading(true);
  //  let data = await fetch(url);
  //  props.setProgress(30);
  //  let parseData = await data.json();
  //  props.setProgress(70);
  //  setArticles(parseData.articles);
  //  settotalResults(parseData.totalResults);
  //  setLoading(false);
  //  props.setProgress(100);
  //  setPage(page-1);
  //}
  
  //const handleNextClick = async () => {
  //  if((page+1) < Math.ceil(totalResults/props.pagesize))
  //  {
  //    console.log("Next");
  //    props.setProgress(10);
  //    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3a3bccea7bf9445aa8f89dd63
  //    &page=${page+1}&pagesize=${props.pagesize}`;
  //    setLoading(true);
  //    let data = await fetch(url);
  //    props.setProgress(30);
  //    let parseData = await data.json();
  //    props.setProgress(70);
  //    setArticles(parseData.articles);
  //    settotalResults(parseData.totalResults);
  //    setLoading(false);
  //    props.setProgress(100);
  //    setPage(page+1);
  //  }
  //}

    return (
      <div className="container my-3">
        <h2 className="text-center" style={{marginTop:"80px", marginBottom: "20px"}} >
          NewsLine Express - Top {capitalize(props.category)}{" "}
          Headlines
        </h2>
        {loading && <Spinner />}
          <div className="container row">
            {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem  togglemode={props.togglemode} title={element.title ? element.title : " "} description={element.description ? element.description : " "}
                      imgUrl={element.urlToImage? element.urlToImage: "https://lgbti-era.org/wp-content/uploads/2023/01/no-image.png"} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                  </div>
                );
              })}
          </div>
        {/*<div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                    <button disabled={(page + 1) > Math.ceil(totalResults / props.pagesize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>*/}
      </div>
    );
}

News.defaultProps = {
  country: "in",
  category: "general",
  pagesize: "15",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pagesize: PropTypes.number,
};

export default News;
