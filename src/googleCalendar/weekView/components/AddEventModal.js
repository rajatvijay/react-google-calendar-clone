import {Modal, Button} from 'antd';
import React, {Component} from 'react';
import AddEvent from './AddEvent';

class AddEventModal extends Component {
  state = {
    title: '',
  };

  handleTitleChange = event => {
    this.setState ({
      title: event.target.value,
    });
  };

  handleOk = () => {
    this.props.onOk (this.state.title);
  };

  render () {
    const {title} = this.state;
    return (
      <Modal
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.props.onCancel}
        footer={[
          <Button key="back" onClick={this.props.onCancel}>
            {this.props.editMode ? 'Delete' : 'Cancel'}
          </Button>,
          <Button key="submit" type="primary" onClick={this.handleOk}>
            {this.props.editMode ? 'Update Event' : 'Add Event'}
          </Button>,
        ]}
      >
        <AddEvent
          title={title}
          onTitleChange={this.handleTitleChange}
          start={this.props.eventStart}
          end={this.props.eventEnd}
          onTimeChange={this.props.onTimeChange}
        />
      </Modal>
    );
  }
}

export default AddEventModal;
