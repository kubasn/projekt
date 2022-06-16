import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import Projects from "../../Components/Projects/Projects";

const SearchPage = (props) => {
  const { term } = useParams();
  const [projects, setProjects] = useState([]);

  async function searchHandler() {
    const response = await axios.get("/offers", {
      params: {
        term: term,
      },
    });
    setProjects(response.data.message);
  }

  useEffect(() => {
    searchHandler();
  }, [term]);

  return (
    <div>
      <h2>Wyniki wyszukiwania dla frazy: {term}</h2>
      <Projects projects={projects} />
    </div>
  );
};

export default SearchPage;
