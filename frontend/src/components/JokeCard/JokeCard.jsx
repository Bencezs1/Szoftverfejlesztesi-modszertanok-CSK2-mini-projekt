import React, { useState } from 'react'
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

    const [rating, setRating] = useState(3);
    const [current, setCurrent] = useState(3);


  return (
    <div className="card">
      <div className="card-body">
        <div style={deletStyle}>
          <h5 className="card-title" style={cardHeadStyle}>Card title</h5>
          <button type="button" className="btn btn-danger">Törlés</button>
        </div>
        <p className="card-text" style={cardBodyStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor mi sit amet varius congue. Curabitur gravida, nunc id ornare placerat, libero mauris hendrerit neque, at ultricies dui felis quis enim. Vestibulum non vehicula lacus. Ut feugiat suscipit risus, ut posuere ex consectetur ut. Nam id mollis leo, at sollicitudin dui. Maecenas sit amet leo lorem. Cras lobortis eu purus id posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed blandit, metus ut malesuada semper, quam erat maximus tellus, nec facilisis tortor lectus vel erat. Phasellus commodo quam eros, id rhoncus leo placerat id.
        </p>
          <Rating
            value={rating}
            onChange={(event, newValue) => {
                setRating(newValue);
            }}
        />
        <br />
        <button className="btn btn-primary">Értékelés</button>

      </div>
    </div>
  )
}

export default JokeCard
