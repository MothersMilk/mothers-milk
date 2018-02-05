import React, { PureComponent } from 'react';

class Table extends PureComponent {
  state = {
    editing: null
  }

  componentDidMount() {
    this.props.load();
  }

  handleUpdate = (event, item) => {
    event.preventDefault();
    const { elements: updates } = event.target;
    const updatedFields = Object.values(updates).filter(field => field.value !== '');
    updatedFields.forEach(field => item[field.name] = field.value);
    this.props.update(item);
  }

  handleDelete = id => {
    this.props.remove(id);
  }

  fieldCheck = item => { 
    return typeof item === 'object' ? item.name : item;
  };

  render() {
    
    const { data, dataType } = this.props;
    const { editing } = this.state;
    let fields = null;
    if (data) fields = data.length && Object.keys(data[0]);
    fields && fields.shift();

    const updateInputs = fields ? fields.map(item => <input type="text" name={typeof item !== 'object' ? item : null} placeholder={this.fieldCheck(item)}/>) : null;
    const tableData = fields ? data.map(item => {
      const rowData = Object.values(item).filter(item => item !== null)
      const id = rowData.shift();
      const row = rowData.map((value, index) => <li style={{ display:'inline', margin:'5px' }}>{this.fieldCheck(value)}</li>);
      return (
        <ul>
          {row}
          <li style={{ display:'inline' }}><input type="button" value="X" onClick={() => this.handleDelete(id)}/></li>
          <li style={{ display:'inline' }}><input type="button" value="✎" onClick={() => this.setState({ editing: id })}/></li>
          {(editing === id) && <li><form onSubmit={event => this.handleUpdate(event, item)}>{updateInputs}<input type="submit"/></form></li>}
        </ul>
      );
    }): null;
    
    return(
      <div>
        <h3>{dataType}</h3>
        <ul>
          {tableData}
        </ul>
      </div>
    );
  }
}

export default Table;