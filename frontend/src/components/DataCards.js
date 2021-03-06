import React from "react";
import Card from "./Card";

export default props => {
  return (
    <div className="container__cards">
      <Card className="container__cards-card-data" data={props.totalCases} cardValue="COVID-19 cases" allCases={props.data} />
      <Card className="container__cards-card-data" data={props.totalDeaths} cardValue="Total deaths" allCases={props.data}/>
    </div>
  )
}