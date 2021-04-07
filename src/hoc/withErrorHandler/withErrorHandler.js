import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        UNSAFE_componentWillMount() {
            this.configInterceptor = axios.interceptors.request.use(config => {
                this.setState({error: null});
                return config;
            })
            this.resInterceptor = axios.interceptors.response.use(config => config, error => {
                this.setState({error: error});
                return Promise.reject(error);
            })
        }

        componentWillUnmount() {
            console.log('Unmounted', this.configInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.configInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal show={!!this.state.error} closeModal={this.errorConfirmedHandler}>
                        <h3 style={{textAlign: 'center', color: 'red'}}>
                            {this.state.error ? this.state.error.message : null}
                        </h3>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
};

export default withErrorHandler;