import React from "react";

export default props => {
  const data = props.data;
  console.log(data)

  const List = () => {
    return data.map(item => {
      return <tr className="table__allCases-tr" key={item._id}>
        <td className="table__allCases-td"><b>{item.body.name}</b></td>
        <td className="table__allCases-td">{item.body.cases}</td>
      </tr>
    })
  }

  return (
    <div className="container__table">
      <table className="table__allCases">
        <tbody>
          <List />
        </tbody>
      </table>
    </div>
  )
}