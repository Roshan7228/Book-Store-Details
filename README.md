# Book-Store-Details
Using mongoose db 

<a href="https://drive.google.com/file/d/1toiZZfuJzGi4iY8v7m2mPukbRgIWmVYq/view?usp=drive_link">Video Link</a>

// Front-End Code

import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navbars() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Navbar Brand with Logo */}
        <Navbar.Brand as={NavLink} to="/">
          <img
            src="https://www.adobe.com/creativecloud/design/discover/media_17770be5de64c9b159b23a7da870ae0bd5bc0f400.jpeg?width=1200&format=pjpg&optimize=medium"
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* NavLinks with Flex Styling */}
          <Nav className="m-auto d-flex justify-content-between w-50">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/Productpage" className="nav-link">Product</NavLink>
            <NavLink to="/AddProductpage" className="nav-link">AddProductpage</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;

//home page
import React from 'react';

function HomePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <p>Go back to <a href="/">Home</a></p>
    </div>
  );
}

export default HomePage;

// Productpage
import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Productpage() {
  const [data, setData] = useState([]);

  function fetchData() {
    axios
      .get('http://localhost:8080/api/book/getallbook')
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

function handleDelete(_id){
  axios.delete(`http://localhost:8080/api/book/deletebook/${_id}`)
  .then((res)=>{
    alert("Data Delete");
  })
  .catch((err) => {
    console.log(err)
  })
}

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold">Product Page</h2>
      <p className="text-center text-muted">Browse our collection of books.</p>

      <Row className="w-100 g-4">
        {data.map((book, index) => (
          <Col key={index} sm={6} md={4} lg={4}>
            <Card
              className="text-white shadow-lg border-0"
              style={{
                backgroundColor: '#6f42c1',
                borderRadius: '10px',
                height: "300px"
              }}
            >
              <Card.Body>
                <Card.Title className="fw-bold">{book.Title}</Card.Title>
                <Card.Subtitle className="mb-2 text-warning">
                  Author: {book.Author}
                </Card.Subtitle>
                <Card.Text className="mb-2">
                  <strong>Price:</strong> ₹{book.Price}
                </Card.Text>
                <Card.Text className="mb-2">
                  <strong>ISBN:</strong> {book.ISBN}
                </Card.Text>
                <Card.Text className="mb-3">{book.Description}</Card.Text>
                <div className="d-flex">
                  <button className="btn btn-light"><Link to={`/Descriptionpage/${book._id}`}  className=" text-dark text-decoration-none">View Details</Link></button>
                  <button className="btn btn-light ms-3 "><Link to={"/Updatepage"} state={{_id:book._id,Title:book.Title,Author:book.Author,Price:book.Price,Description:book.Description}} className=" text-dark text-decoration-none">Update Details</Link></button>
                  <button className="btn btn-light ms-3" onClick={()=>{handleDelete(book._id)}}>Delete</button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Productpage;

//addproductpage
import React, { useState } from 'react';
import '../style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProductpage() {
  const Navigate=useNavigate();
  // State to store book data
  const [BookDataAdd, setBookDataAdd] = useState({
    Title: "",
    Author: "",
    Price: "",
    Description: ""
  });

  // Handle Input Change
  const handleChange = (e) => {
    setBookDataAdd({ ...BookDataAdd, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/api/book/createbook", BookDataAdd)
      .then((res) => {
        console.log("Book Added Successfully:", res.data);
        alert("Book added successfully!");
        setBookDataAdd({ Title: "", Author: "", Price: "", Description: "" });
        Navigate("/Productpage")
      })
      .catch((err) => {
        console.error("Error adding book:", err);
        alert("Failed to add book!");
      });
  };

  return (
    <div>
      <div className="Form-Container">
        <h3>Add New Book</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Title">Title <span>*</span></label>
          <input
            type="text"
            name="Title"
            placeholder="Enter Title..."
            value={BookDataAdd.Title}
            onChange={handleChange}
            required
          />

          <label htmlFor="Author">Author <span>*</span></label>
          <input
            type="text"
            name="Author"
            placeholder="Enter Author Name..."
            value={BookDataAdd.Author}
            onChange={handleChange}
            required
          />

          <label htmlFor="Price">Price <span>*</span></label>
          <input
            type="number"
            name="Price"
            placeholder="Enter Price..."
            value={BookDataAdd.Price}
            onChange={handleChange}
            required
          />
          <label htmlFor="Description">Description <span>*</span></label>
          <input type="text" name="Description" placeholder="Description..." value={BookDataAdd.Description}
            onChange={handleChange} required />
          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
}

export default AddProductpage;

//description page
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function Descriptionpage() {
  const params = useParams();
  const [BookDescription, setBookDescription] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/book/description/${params._id}`)
      .then((res) => {
        setBookDescription(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params._id]);

  console.log(BookDescription);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // full viewport height
        backgroundColor: '#f0f2f5', // thoda soft bg
        padding: '20px',
      }}
    >
      <Card
        className="text-white shadow-lg border-0"
        style={{
          backgroundColor: '#6f42c1',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '500px',
          padding: '20px',
        }}
      >
        <Card.Body>
          <Card.Title className="fw-bold">{BookDescription.Title}</Card.Title>
          <Card.Subtitle className="mb-2 text-warning">
            Author: {BookDescription.Author}
          </Card.Subtitle>
          <Card.Text className="mb-2">
            <strong>Price:</strong> ₹{BookDescription.Price}
          </Card.Text>
          <Card.Text className="mb-2">
            <strong>ISBN:</strong> {BookDescription.ISBN}
          </Card.Text>
          <Card.Text className="mb-3">{BookDescription.Description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Descriptionpage;

//Updatepage
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../style.css'
import axios from 'axios';

function Updatepage() {
  let Location = useLocation();
  let Navigate = useNavigate();

  let { _id, Title, Author, Price, Description } = Location.state;
  let [UpdateTitle, setUpdateTitle] = useState(Title);
  let [UpdateAuthor, setUpdateAuthor] = useState(Author);
  let [UpdatePrice, setUpdatePrice] = useState(Price);
  let [UpdateDescription, setUpdateDescription] = useState(Description);


  function handleUpdate(e) {
    e.preventDefault();
    axios.patch(`http://localhost:8080/api/book/updatebook/${_id}`, {
      Title: UpdateTitle,
      Author: UpdateAuthor,
      Price: UpdatePrice,
      Description: UpdateDescription
    }).then((res) => {
      alert("Updated Successfully");
      Navigate('/Productpage');
    }).catch((err) => {
      console.log(err)
    })
  }


  return (
    <div>
      <div className="Form-Container">
        <h3>Update Book</h3><br></br>
        <form onSubmit={handleUpdate}>
          <label htmlFor="Title">Title <span>*</span></label>
          <input
            type="text"
            name="Title"
            placeholder="Enter Title..."
            value={UpdateTitle}
            onChange={(e) => { setUpdateTitle(e.target.value) }}
            required
          />

          <label htmlFor="Author">Author <span>*</span></label>
          <input
            type="text"
            name="Author"
            placeholder="Enter Author Name..."
            value={UpdateAuthor}
            onChange={(e) => { setUpdateAuthor(e.target.value) }}
            required
          />

          <label htmlFor="Price">Price <span>*</span></label>
          <input
            type="number"
            name="Price"
            placeholder="Enter Price..."
            value={UpdatePrice}
            onChange={(e) => { setUpdatePrice(e.target.value) }}
            required
          />
          <label htmlFor="Description">Description <span>*</span></label>
          <input type="text" name="Description" placeholder="Description..." value={UpdateDescription} onChange={(e) => { setUpdateDescription(e.target.value) }}
            required />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  )
}

export default Updatepage

//ALl routs
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import HomePage from "./page/HomePage";
import Productpage from './page/Productpage';
import Updatepage from './page/Updatepage';
import Descriptionpage from "./page/Descriptionpage";
import AddProductpage from './page/AddProductpage';
function Allroutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/Productpage' element={<Productpage/>}></Route>
            <Route path='/Updatepage' element={<Updatepage/>}></Route>
            <Route path='/AddProductpage' element={<AddProductpage/>}></Route>
            <Route path='/Descriptionpage/:_id' element={<Descriptionpage/>}></Route>
        </Routes>
    </div>
  )
}

export default Allroutes

//app js
import Allroutes from "./allroutes"
import Navbars from "./Component/Navbar"



function App() {


  return (
   <>
   <Navbars/>
   <Allroutes/>
   </>
  )
}

export default App

//main js 
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

//style css
* {
    margin: 0%;
    padding: 0%;
    box-sizing: border-box;
}
.Form-Container{
    width: 350px;
    height: 400px;
    padding: 10px;
    background-color: rgb(255, 255, 255);
    box-shadow: #000000;
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;    
}
.Form-Container form label{
    display: block;
    margin-bottom: 5px;
}
.Form-Container form label span{
    color: red;
}
.Form-Container form input{
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    outline: none;
     border-top: none;
     border-left: none;
     border-right: none;
     border-bottom: 1px solid grey;
     margin-bottom: 10px;
}

.Form-Container form button{
    position: relative;
    left: 30%;
    width: 100px;
    border-radius: 5px;
    outline: none;
    background-color: green;
    border: none;
    color: #F2F2F2;
    padding-top: 5px;
    padding-bottom: 5px;
}
