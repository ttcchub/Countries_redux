import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { clearFavourites } from '../features/countries/favouritesSlice'
import { initializeCountries } from '../features/countries/countriesSlice'

const Favourites = () => {
  var numFormatter = require('@skalwar/simple_number_formatter')
  const dispatch = useDispatch()
  let countriesList = useSelector((state) => state.countries.countries)
  const loading = useSelector((state) => state.countries.isLoading)
  const [search, setSearch] = useState('')
  const favouritesList = useSelector((state) => state.favourites.favourites)
  if (favouritesList !== null) {
    countriesList = countriesList.filter((c) => favouritesList.includes(c.name.common))
  } else {
    countriesList = []
  }

  useEffect(() => {
    dispatch(initializeCountries())
  }, [dispatch])
  return (
    <Container fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: '18rem' }}
              type="search"
              className="me-2 "
              placeholder="Search for countries"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
        <Col>
          <button
            onClick={() => dispatch(clearFavourites())}
            className="px-4 py-2 mr-2 mt-5 text-sm font-medium text-red"
          >
            Clear favourites
          </button>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">

        {countriesList
          .filter((country) => {
            return country.name.official.toLowerCase().includes(search.toLowerCase())
          })
          .map((country) => (
            <Col className="mt-5">
              <LinkContainer
                to={`/countries/${country.name.common}`}
                state={{ country: country }} //Passing state allows access to it in a linked component Countries=>CountriesSingle
              >
                <Card className="h-100">
                  <Card.Body className="d-flex flex-column">
                    <Card.Img variant="top" src={country.flags.png} />
                    <Card.Title>{country.name.common}</Card.Title>
                    <Card.Subtitle className="mb-5 text-muted">
                      {country.name.official}
                    </Card.Subtitle>
                    <ListGroup variant="flush" className="flex-grow-1 justify-content-end">
                      <ListGroup.Item>
                        <i className="bi bi-translate me-2"></i>
                        {Object.values(country.languages || {}).join(', ')}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <i className="bi bi-cash-coin me-2"></i>
                        {Object.values(country.currencies || {})
                          .map((currency) => currency.name)
                          .join(',')}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <i className="bi bi-people me-2"></i>
                        {numFormatter(country.population)}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </LinkContainer>
            </Col>
          ))}
      </Row>
    </Container>
  )
}

export default Favourites
