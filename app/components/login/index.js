import './style.css';
import mediator from '../mediator';

class Login {
    constructor(domNode) {
        this._domNode = domNode;

        this._domNode.querySelector('.js-button').addEventListener('click', this._submit.bind(this));
    }

    hide() {
        this._domNode.classList.add('hide');
    }

    show() {
        this._domNode.classList.remove('hide');
    }

    _submit() {
        const value = this._domNode.querySelector('.js-input').value;

        if (value) {
            mediator.emit("user:join", { 'name': value });
        }  
    }
}

export default Login;
