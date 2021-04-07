import reducer from './auth';
import * as actionCreators from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    });

    it('should store the token upon the login', () => {
        expect(reducer({
            token: 'some-token',
            userId: 'some-userId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionCreators.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-userId'
        }))
    });
});