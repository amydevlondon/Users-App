import React, { useState, useEffect } from 'react';
import Loading from './components/Loading';
import Error from './components/Error';
import User from './components/User';

export const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [resultsNum, setResultsNum] = useState(2);
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("gb");

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`https://randomuser.me/api/?results=${resultsNum}&gender=${gender}&nat=${country}`);
        const data = await response.json();
        setIsLoading(false);
        setUsers(data.results);
      } catch {
        setIsLoading(false);
        setIsError(true);
      }
    };
    fetchData();
    return () => {
      setUsers([]);
    };
  }, [resultsNum, gender, country]);

  const changeResultsNum = (e) => {
    e.preventDefault();
    setResultsNum(e.target.value);
  };

  const changeGender = (e) => {
    e.preventDefault();
    setGender(e.target.value);
  };

  const changeCountry = (e) => {
    e.preventDefault();
    setCountry(e.target.value);
  };

  return (
    isLoading ? <Loading />
      : isError ? <Error />
        :
        <>
          <form className="form">
            <label htmlFor="number">Number of Users</label>
            <select value={resultsNum} onChange={changeResultsNum}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <label htmlFor="gender">Gender</label>
            <select value={gender} onChange={changeGender}>
              <option value="">Unspecified</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            <label htmlFor="country">Country</label>
            <select value={country} onChange={changeCountry}>
              <option value="au">Australia</option>
              <option value="br">Brazil</option>
              <option value="ca">Canada</option>
              <option value="dk">Denmark</option>
              <option value="fi">Finland</option>
              <option value="fr">France</option>
              <option value="de">Germany</option>
              <option value="ir">Iran</option>
              <option value="ie">Ireland</option>
              <option value="nl">Netherlands</option>
              <option value="nz">New Zealand</option>
              <option value="no">Norway</option>
              <option value="es">Spain</option>
              <option value="ch">Switzerland</option>
              <option value="tr">Turkey</option>
              <option value="gb">United Kingdom</option>
              <option value="us">United States</option>
            </select>
          </form>
          <section className="users">
            {users.map((user) => {
              return (
                <User key={user.id.value} {...user} />
              );
            })}
          </section>
        </>
  );
};

export default App;