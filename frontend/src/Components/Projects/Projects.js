import Project from "./Project/Project";
import styles from "./Projects.module.css";

const Projects = (props) => {
  return (
    <div>
      <h3 className={styles.header}>
        Liczba ofert na stronie: {props.projects.length}
      </h3>
      <div className={styles.projects}>
        {props.projects.map((el) => (
          <Project {...el} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
