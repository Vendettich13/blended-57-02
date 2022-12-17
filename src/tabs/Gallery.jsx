import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { Spiner } from '../components/Spiner/Spiner';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    showBtn: false,
    error: null,
    loading: false,
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { page, query, loading } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });
      ImageService.getImages(query, page)
        .then(data =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.photos],
            showBtn: page < Math.ceil(data.total_results / 15),
          }))
        )
        .catch(error => {
          this.setState({ error: 'Something went wrong. Please try again' });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  };

  handleSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
        {this.state.loading && <Spiner />}
        <Grid>
          {this.state.images.map(({ id, avg_color, src, alt }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {this.state.showBtn && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}

        {this.state.error && (
          <Text textAlign="center">❌ - {this.state.error}</Text>
        )}
      </>
    );
  }
}
