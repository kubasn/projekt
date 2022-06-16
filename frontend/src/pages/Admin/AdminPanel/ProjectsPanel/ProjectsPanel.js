import { useEffect, useState } from "react";
import style from "./ProjectsPanel.module.css";
import axios from "../../../../axios";
import Project from "./Project/Project";
import EditPanel from "./EditPanel/EditPanel";

const ProjectsPanel = (props) => {
  const [projects, setProjects] = useState([]);
  useEffect(async () => {
    const res = await axios.get("/offers");
    setProjects(res.data.message);
  }, []);

  const onDelete = async (id) => {
    let newProjects = projects;
    let index = newProjects.findIndex((x) => x._id === id);
    newProjects = newProjects.filter((item) => item._id !== id);
    setProjects(newProjects);
    const res = await axios.delete(`/offers/${id}`);
  };

  return (
    <div className={style.projectsPanel}>
      {projects ? (
        <div className={style.panel}>
          <h1 id={style.heading1}>Oferty</h1>
          <div className={style.projects}>
            <div className={style.heading2}>
              <span>ID</span>
              <span>Tytuł</span>
              <span></span>
            </div>
            {projects.map((el) => {
              return (
                <>
                  <Project
                    onUpdate={setProjects}
                    onDelete={() => onDelete(el._id)}
                    {...el}
                  />
                </>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProjectsPanel;
