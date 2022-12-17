import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: []
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { page, query } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      ImageService.getImages(query, page).then(data => this.setState(prevState =>({images: [...prevState.images, ...data.photos]})))
    }
  }
  

  handleSubmit = (query) => {
    this.setState({query})
  }
 

  render() {
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
