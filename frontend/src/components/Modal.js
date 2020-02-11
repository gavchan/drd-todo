import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    };

    handleChange = e => {
        const wasCompleted = this.state.activeItem.completed;
        let activeCompleted_at = null;
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
            if (value && !wasCompleted) {
                // If checked as completed when not previously, to update datetime
                let t = new Date();
                activeCompleted_at = t.toISOString();
            }
        }
        const activeItem = { ...this.state.activeItem, 
            [name]: value,
            completed_at: activeCompleted_at
        };
        this.setState({ activeItem });
    };
    
    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="task">Task</Label>
                            <Input
                              type="text"
                              name="task"
                              value={this.state.activeItem.task}
                              onChange={this.handleChange}
                              placeholder="Enter Task"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input 
                              type="text"
                              name="description"
                              value={this.state.activeItem.description}
                              onChange={this.handleChange}
                              placeholder="Enter Task description"
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label for="completed">
                              <Input 
                                type="checkbox"
                                name="completed"
                                checked={this.state.activeItem.completed}
                                onChange={this.handleChange}
                              />
                              Completed 
                              { this.state.activeItem.completed ? ' at ' + this.state.activeItem.completed_at : null}
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}