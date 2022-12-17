import { MagnifyingGlass } from 'react-loader-spinner';

import { Backdrop } from './Spiner.styled';

export const Spiner = () => {
  return (
    <Backdrop>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
      ;
    </Backdrop>
  );
};
