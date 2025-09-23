import React, { useState } from 'react'
import ReactModal from 'react-modal';
import Rating from '@mui/material/Rating';

const JokeCard = () => {


    const cardHeadStyle = {
        marginBottom: "50px",
        marginTop: "20px"
    }

    const cardBodyStyle = {
        marginBottom: "40px"
    }

    const deletStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }

    const [rating, setRating] = useState(3)
    const [current, setCurrent] = useState(0)
    const [showCard, setShowCard] = useState(false)

    const cardContent = (
      <>
        <div style={deletStyle}>
          <h5 className="card-title" style={cardHeadStyle}>Card title</h5>
          <button onClick={(e)=>{e.stopPropagation()}} type="button" className="btn btn-danger">Törlés</button>
        </div>
        <p className="card-text" style={cardBodyStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor mi sit amet varius congue. Curabitur gravida, nunc id ornare placerat, libero mauris hendrerit neque, at ultricies dui felis quis enim. Vestibulum non vehicula lacus. Ut feugiat suscipit risus, ut posuere ex consectetur ut. Nam id mollis leo, at sollicitudin dui. Maecenas sit amet leo lorem. Cras lobortis eu purus id posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed blandit, metus ut malesuada semper, quam erat maximus tellus, nec facilisis tortor lectus vel erat. Phasellus commodo quam eros, id rhoncus leo placerat id.
        </p>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <Rating onClick={(e)=>{e.stopPropagation()}}
              value={rating}
              onChange={(event, newValue) => {
                  setRating(newValue);
              }}
          />
          <div>
            <span>{current}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
            </svg>
          </div>
        </div>
        <br />
        <button onClick={(e)=>{e.stopPropagation()}} className="btn btn-primary">Értékelés</button>
      </>
    )


  return (
    <>
    <div className="card" onClick={() => setShowCard(true)} style={{ cursor: "pointer" }}>
        <div className="card-body">{cardContent}</div>
    </div>
    <ReactModal
        isOpen={showCard}
        onRequestClose={() => setShowCard(false)}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
          content: {
            maxWidth: "600px",
            margin: "auto",
            borderRadius: "10px",
            padding: "20px"
          }
        }}
      >
        <div className="card">
          <div className="card-body">{cardContent}</div>
        </div>
      </ReactModal>
    </>
  )
}

export default JokeCard
