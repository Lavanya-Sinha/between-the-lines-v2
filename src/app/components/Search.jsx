const Search = ({ action, placeholder, queryName, defaultValue }) => {
  return (
    <div>
      <form action={action}>
        <input
          type="search"
          name={queryName}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
export default Search;
