import React, { useState, useEffect } from 'react';
import Loading from './components/Loading';
import Error from './components/Error';
import User from './components/User';

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [resultsNum, setResultsNum] = useState(2);
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const countries = [{ country: "Unspecified", code: "" }, { country: "Australia", code: "au" }, { country: "Brazil", code: "br" }, { country: "Canada", code: "ca" }, { country: "Denmark", code: "dk" }, { country: "Finland", code: "fi" }, { country: "France", code: "fr" }, { country: "Germany", code: "de" }, { country: "Iran", code: "ir" }, { country: "Ireland", code: "ie" }, { country: "Netherlands", code: "nl" }, { country: "New Zealand", code: "nz" }, { country: "Norway", code: "no" }, { country: "Spain", code: "es" }, { country: "Switzerland", code: "ch" }, { country: "Turkey", code: "tr" }, { country: "United Kingdom", code: "gb" }, { country: "United States", code: "us" }];

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`https://randomuser.me/api/?results=${resultsNum}&gender=${gender}&nat=${country}`);
        const data = await response.json();
        setUsers(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
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

  if (isLoading)
    return <Loading />;
  if (isError)
    return <Error />;
  return (
    <>
      <form className="form">
        <label htmlFor="number">Number of Users</label>
        <select value={resultsNum} onChange={changeResultsNum}>
          {numbers.map((number) => {
            return (
              <option key={number} value={number}>{number}</option>
            );
          })}
        </select>
        <label htmlFor="gender">Gender</label>
        <select value={gender} onChange={changeGender}>
          <option value="">Unspecified</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <label htmlFor="country">Country</label>
        <select value={country} onChange={changeCountry}>
          {countries.map((item) => {
            return (
              <option key={item.code} value={item.code}>{item.country}</option>
            );
          })}
        </select>
      </form>
      <section className="users">
        {users.map((user) => {
          return (
            <User key={users.indexOf(user)} {...user} />
          );
        })}
      </section>
    </>
  );
};

export default App;