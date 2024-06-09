import React, { SyntheticEvent } from "react";

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchString: string;
  onSearchSubmit: (e: SyntheticEvent) => void;
}

const Search = ({ handleChange, searchString,onSearchSubmit }: Props) => {
  return (
    <>
    <form onSubmit={onSearchSubmit} >
      <input value={searchString} onChange={(e) => handleChange(e)} />

      {/* <button onClick={(e) => handleClick(e)} /> */}
    </form>
    </>
  );
};
export default Search;
