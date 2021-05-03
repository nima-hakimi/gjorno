import React from "react";

export default function ErrroMessage({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <p>*Påkrevd*</p>;
      case "minLength":
        return <p>Your last name need minmium 2 charcaters</p>;
      case "userNamePattern":
        return <p>*Brukernavn kan bare inneholde store og små bokstaver og tall*</p>;
      case "validatePassword":
        return <p>*Passordene er ulike*</p>;
    case "validateUserName":
        return <p>*Brukernavn er opptatt*</p>
      default:
        return null;
    }
  }

  return null;
}
