import React, { Component } from 'react';
import { Form, Button, Grid, Segment } from 'semantic-ui-react';
import axios from 'axios';
import config from 'react-global-configuration';

class ClientRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            contact: '',
            description: '',
            first_name: '',
            last_name: '',
            middle_name: '',
            location: '',
            dob: ''
        };
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    register = (e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log(JSON.stringify(this.state));

        axios.post(config.get('base_url') + '/register/client', this.state, {
            headers: { 'CLIENT_TOKEN': localStorage.getItem('CLIENT_TOKEN') }
        })
        .then(response => {
            console.log(response);
            if (response.status === 200) {
                localStorage.removeItem('CLIENT_TOKEN');
                // Optionally redirect or show a success message
            }
        })
        .catch(error => {
            console.error("There was an error registering the client!", error);
            // Optionally show an error message to the user
        });
    }

    componentDidMount() {
        const { token } = this.props.match.params;
        localStorage.setItem('CLIENT_TOKEN', token);
    }

    render() {
        const { username, password, email, contact, description, first_name, last_name, middle_name, location, dob } = this.state;

        return (
            <Grid centered>
                <Grid.Column width={12}>
                    <Segment inverted>
                        <Form inverted onSubmit={this.register}>
                            <Form.Group widths="equal">
                                <Form.Input label='Username' placeholder='Username' name="username" value={username} onChange={this.handleChange} />
                                <Form.Input label='Password' placeholder='Password' type='password' name="password" value={password} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Input label='Email' placeholder='Email' name="email" value={email} onChange={this.handleChange} />
                            <Form.Input label='Contact number' placeholder='Contact' name="contact" value={contact} onChange={this.handleChange} />
                            <Form.Input label='Description' placeholder='Description' name="description" value={description} onChange={this.handleChange} />
                            <Form.Group widths="equal">
                                <Form.Input label='First Name' placeholder='First Name' name="first_name" value={first_name} onChange={this.handleChange} />
                                <Form.Input label='Middle Name' placeholder='Middle Name' name="middle_name" value={middle_name} onChange={this.handleChange} />
                                <Form.Input label='Last Name' placeholder='Last Name' name="last_name" value={last_name} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Input label='Location' placeholder='Location' name="location" value={location} onChange={this.handleChange} />
                            <Form.Input label='Date of Birth (DD/MM/YYYY)' placeholder='DD/MM/YYYY' name="dob" value={dob} onChange={this.handleChange} />
                            <Button type='submit'>Register</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default ClientRegister;