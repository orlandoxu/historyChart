const UsingFragment = (props) => (
  <div>
    <p>This is regular paragraph</p>
    <div>
      <p>This is a paragraph in a fragment</p>
      <div>
        <p>Hello {props.name}</p>
      </div>
      <ul>
        {[1, 2, 3].map(item => (
          <li>{item}</li>
        ))}
      </ul>
      <button onClick={() => {alert('fad')}}> hello button </button>
    </div>
  </div>
);

export { UsingFragment }

