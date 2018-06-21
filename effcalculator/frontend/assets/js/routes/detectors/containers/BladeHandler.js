
import React, {Component} from 'react';
import BladesForm from '../containers/BladesForm'

class BladeHandler extends React.Component {
  constructor(props) {
    super(props);
    console.log('props')
    console.log(props)
    this.state = {text: '', inputText: '', mode:'view', onSubmit:props.onSubmit};

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEditMulti = this.handleEditMulti.bind(this);
    this.handleEditSingle = this.handleEditSingle.bind(this);
  }

  handleChange(e) {
    this.setState({ inputText: e.target.value });
  }

  handleSave() {
    this.setState({text: this.state.inputText, mode: 'view'});
  }
  handleEditSingle() {
    this.setState({mode: 'single'});
  }
  handleEditMulti() {
    this.setState({mode: 'multi'});
  }
  renderInputField() {
    if(this.state.mode === 'view') {
      return <div></div>;
    } else if(this.state.mode === 'multi')  {
      console.log('multi')
        let initialValues = {'single':false}
      return (
          <BladesForm onSubmit={this.state.onSubmit} initialValues={{'single':false}}/>
      );
    } else {
      return  <div> <p>single not available right now</p></div>
    }
  }

  renderButton() {
    if(this.state.mode === 'view') {
      return (
          <div>
              <p>Select a configuration:</p>
              <button onClick={this.handleEditSingle}>
                single
              </button>
              <button onClick={this.handleEditMulti}>
                multi
              </button>
          </div>
      );
    } else if (this.state.mode ==='single'){
      return (
          <button onClick={this.handleSave}>
            Save
          </button>
      );
    } else {
        return (
          <button onClick={this.handleSave}>
            Cancel
          </button>
      );
    }
  }

  render () {
    return (
      <div>
        {this.renderInputField()}
        {this.renderButton()}
      </div>
    );
  }
}

export default BladeHandler;