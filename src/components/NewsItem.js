import React from 'react'

const NewsItem = (props) => {

    let {title, description, imgUrl, newsUrl, date, author, source} = props;

    return (
      <div className='my-4'>
        <div className="card" style={{border:"none"}}>
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'50%', zIndex:'1'}}>
            {source}<span className="visually-hidden"></span>
            </span>
            <img src={imgUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-body-secondary">By {author? author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-primary">Read More...</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem
