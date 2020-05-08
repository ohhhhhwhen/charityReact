import { Col, Container, Row } from "../components/Grid";
// import { FormBtn, Input, TextArea } from "../components/Form";
import { List, ListItem } from "../components/List";
import React, { useEffect, useState } from "react";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [formObject, setFormObject] = useState({});

  const [result, setResults] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadFavorites();
  }, []);

  function loadFavorites() {
    API.getFavorites()
      .then(res => setFavorites(res.data))
      .catch(err => console.error(err));
  }

  function deleteFavorites(id) {
    API.deleteFavorites(id)
      .then(() => loadFavorites())
      .catch(err => console.error(err));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleSaveButton(event) {
    event.preventDefault();
    API.saveFavorites({
      charityName: formObject.title
    })
      .then(() => loadBooks())
      .catch(err => console.error(err));
  }

  const handleInputChange = event => {
    setSearch(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (!search) {
      return;
    }

    API.searchcharity(search).then(res => {
      if (res.data.length === 0) {
        throw new Error("No results found.");
      }
      if (res.data.status === "error") {
        throw new Error(res.data.message);
      }
      console.log(res.data);
      setResults(res.data);
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h1>Search Charities/Organization</h1>
          </Jumbotron>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input
                type="text"
                onChange={handleInputChange}
                className="form-control"
                placeholder="Search For Topics Or Organiztions Here"
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className="btn btn-danger"
              style={{ marginBottom: "20px" }}
            >
              Search
            </button>
          </form>
          <table className="table">
        <tbody>
          {result.map(charities => (
            <tr key={charities.charityName}>
              <td>
                <button style={{margin: '5px'}} className="btn btn-primary">
                  Donate To This Charity
                </button>
                <button onClick={handleSaveButton} style={{marginTop: '20px', marginLeft: "5px"}}  className="btn btn-success">Add Favorites</button>
              </td>
              <td>
                <p>{charities.charityName}</p>
                <p>Cause: {charities.cause.causeName}</p>
                <p>' {charities.tagLine} '</p>
                <p>EIN: {charities.ein}</p>
              </td>
              <td>
                <p>Category: {charities.category.categoryName}</p>
                <p>Rating: <img alt="rating" src={charities.currentRating.ratingImage.large}></img></p>
                <a target="_blank" rel="noopener noreferrer" href={charities.websiteURL}>More Info</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </Col>
        {/* <Col size="md-6 sm-12">
          <Jumbotron>
            <h1>Favorite Charities/Organization</h1>
          </Jumbotron>
          {favorites.length ? (
            <List>
              {favorites.map(favorite => (
                <ListItem key={favorite._id}>
                  <Link to={`/favorites/${favorite._id}`}>
                    <strong>
                      {favorite.charityName}
                    </strong>
                  </Link>
                  <DeleteBtn onClick={() => deleteFavorites(favorite._id)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col> */}
      </Row>
    </Container>
  );
}

export default Favorites;
