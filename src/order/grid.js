import React from 'react';
import { Table } from 'reactstrap';

import './style.css';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.renderRows = this.renderRows.bind(this);
  }
  
  renderRows() {
    const list = this.props.list || [];

    return list.map(
        row => (
            <tr key={row.id}>
                <td>
                  {row.id}
                </td>
                <td>
                  {row.input}
                </td>
                <td>
                  {row.output}
                </td>
            </tr>
        ))
}

  render() {
    return (
      <div>
        <Table striped responsive>
            <thead>
                <tr>
                    <th className="col-id">Id</th>
                    <th className="col-input">Input</th>
                    <th className="col-output">Output</th>
                </tr>
            </thead>
            <tbody>
                {this.renderRows()}
            </tbody>
        </Table>
      </div>
    );
  }
}