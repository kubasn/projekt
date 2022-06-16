import axios from "../../axios";
import { useEffect, useState } from "react";
import Projects from "../../Components/Projects/Projects";
import styles from "./HomePage.module.css";

let optionsArea = [
  { value: 50, label: "50" },
  { value: 75, label: "75" },
  { value: 125, label: "125" },
  { value: 200, label: "200" },
  { value: 250, label: "250" },
  { value: 300, label: "300" },
];

let optionsPrice = [
  { value: 500, label: "500" },
  { value: 750, label: "750" },
  { value: 1250, label: "1250" },
  { value: 2000, label: "2000" },
  { value: 2500, label: "2500" },
  { value: 3000, label: "3000" },
  { value: 5000, label: "5000" },
  { value: 10000, label: "10000" },
];
let optionsCond = [
  { value: "parter", label: "parter" },
  { value: "poddasze", label: "z poddaszem" },
  { value: "pietrowy", label: "piętrowy" },
  { value: "", label: "dowolna opcja" },
];
let optionsGarage = [
  { value: "one", label: "1-stanowiskowy" },
  { value: "two", label: "2-stanowiskowy" },
  { value: "zero", label: "bez garażu" },
  { value: "", label: "dowolna opcja" },
];

let pageSelect = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

function HomePage(props) {
  const [backendProjects, setBackendProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [offersPerPage, setOffersPerPage] = useState(5);
  const [options, setOptions] = useState({
    areaMin: 1,
    areaMax: 10000,
    priceMin: 1,
    priceMax: 1000000,
  });

  const lastPostIndex = currentPage * offersPerPage;
  const firstPostIndex = lastPostIndex - offersPerPage;
  const currentProjects = backendProjects;

  useEffect(async () => {
    //fetchEstates(offersPerPage, firstPostIndex);
    const project = await axios.get("/offers", {
      params: {
        areaMin: options.areaMin == "od" ? 1 : options.areaMin,
        areaMax: options.areaMax == "do" ? 10000 : options.areaMax,
        priceMin: options.priceMin == "od" ? 1 : options.priceMin,
        priceMax: options.priceMax == "do" ? 1000000 : options.priceMax,
        offersPerPage: offersPerPage,
        firstPostIndex: firstPostIndex,
      },
    });
    if (project.data.message.length > 0) {
      setBackendProjects(project.data.message);
    } else {
      setCurrentPage(1);
    }
  }, [offersPerPage, lastPostIndex]);

  const paginationFunction = (numberOfPage) => {
    setCurrentPage(numberOfPage);
  };

  const onChangeFunction = (value, fieldName) => {
    setOptions({
      ...options,
      [fieldName]: value,
    });
  };

  useEffect(async () => {
    const project = await axios.get("/offers", {
      params: {
        areaMin: 1,
        areaMax: 10000,
        priceMin: 1,
        priceMax: 1000000,
        offersPerPage: offersPerPage,
        firstPostIndex: firstPostIndex,
      },
    });
    setBackendProjects(project.data.message);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const project = await axios.get("/offers", {
      params: {
        areaMin: options.areaMin == "od" ? 1 : options.areaMin,
        areaMax: options.areaMax == "do" ? 10000 : options.areaMax,
        priceMin: options.priceMin == "od" ? 1 : options.priceMin,
        priceMax: options.priceMax == "do" ? 1000000 : options.priceMax,
      },
    });
    setBackendProjects(project.data.message);
  };

  return (
    <div className={styles.home}>
      <div className={styles.select}>
        <form onSubmit={submit} className={styles.form}>
          <select
            className={styles.formInput}
            aria-label="Default select example"
            onChange={(e) => onChangeFunction(e.target.value, "areaMin")}
          >
            <option selected value="od">
              Metraż od
            </option>
            {optionsArea.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            className={styles.formInput}
            onChange={(e) => onChangeFunction(e.target.value, "areaMax")}
          >
            <option selected value="do">
              Metraż do
            </option>
            {optionsArea.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            className={styles.formInput}
            aria-label="Default select example"
            onChange={(e) => onChangeFunction(e.target.value, "priceMin")}
          >
            <option selected value="od">
              Cena od
            </option>
            {optionsPrice.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            className={styles.formInput}
            onChange={(e) => onChangeFunction(e.target.value, "priceMax")}
          >
            <option selected value="do">
              Cena do
            </option>
            {optionsPrice.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className={styles.formButton}>Szukaj</button>
        </form>
      </div>
      <Projects projects={backendProjects} />
      <div className={styles.controllButtons}>
        {currentPage - 1 == 0 ? (
          <button disabled={true} className={styles.cntr}>
            POPRZEDNIA
          </button>
        ) : (
          <button
            onClick={() => paginationFunction(currentPage - 1)}
            disabled={false}
            className={styles.cntr}
          >
            POPRZEDNIA
          </button>
        )}
        <select
          onChange={(e) => setOffersPerPage(e.target.value)}
          className={styles.formInput1}
        >
          <option selected hidden>
            Wybierz
          </option>
          {pageSelect.map((page) => (
            <option key={page.value} value={page.value}>
              {page.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => paginationFunction(currentPage + 1)}
          className={styles.cntr}
        >
          NASTĘPNA
        </button>
      </div>
    </div>
  );
}

export default HomePage;
