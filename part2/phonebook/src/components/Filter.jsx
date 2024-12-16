const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input type="text" onChange={props.onchange} value={props.value} />
    </div>
  );
};

export default Filter;
