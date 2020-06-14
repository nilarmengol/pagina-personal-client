import React from "react";
import Projectslogo from "../../../../assets/img/jpg/projects.jpg";

import "./PresentationCourses.scss";

export default function PresentationCourses() {
  return (
    <div className="presentation-courses">
      <img src={Projectslogo} alt="Proyectos de Nil Armengol" />
      <p>
        En Agustín Navarro Academy vas a encontrar los mejores cursos online de
        desarrollo web en Español. Unete a nosotros y empieza tu camino como
        Desarrodor Web o Desarrollador de CMS. Sinceramente, estos curso es el
        tipo de contenido que a mí me hubiera gustado encontrar cuando empecé en
        el mundo del desarrollo web profesional.
      </p>
      <p>
        Echales un vistazo y descubre que yo soy el programador de tus sueños
      </p>
    </div>
  );
}
