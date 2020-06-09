import React from "react";
import logoWhite from "../../../../assets/img/png/logo-white.png";
import SocialLink from "../../SocialLinks";

import "./MyInfo.scss";

export default function MyInfo(props) {
  return (
    <div className="my-info">
      <img src={logoWhite} alt="Nil Armengol Tous" />
      <h4>
        Entra en el mundo del desarrollo web, disfruta creando proyectos de todo
        tipo, deja que tú imaginación fluya y crea verdaderas maravillas!!
      </h4>
      <SocialLink />
    </div>
  );
}
