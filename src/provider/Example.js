import React from 'react';

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    sessionStorage.getItem(localStorageKey) || ''
  );

  React.useEffect(() => {
    sessionStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

const Example = () => {
  const [value, setValue] = useStateWithLocalStorage(
    'myValueInLocalStorage'
  );

  const onChange = event => setValue(event.target.value);

  return (
    <div>
      <h1>Hello React with Local Storage!</h1>

      <input value={value} type="text" onChange={onChange} />

      <p>{value}</p>
    </div>
  );
};

export default Example;