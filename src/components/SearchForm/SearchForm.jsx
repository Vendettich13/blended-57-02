import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    this.props.onSubmit(query);
    e.target.reset();
  }

  render() {
    return <SearchFormStyled onSubmit={this.handleSubmit}>
      <InputSearch name='query'/>
      <FormBtn><FiSearch/></FormBtn>
    </SearchFormStyled>
  }
}
