import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import classNames from 'classnames';
import {Download} from 'lucide-react';

import {canInstallApp, promptInstallApp, subscribeInstallAvailability} from '../../lib/pwa-install';
import styles from './install-app-button.css';

// Shown only while the browser offers to install DoGoBlock (Chrome and Edge, not yet installed).
class InstallAppButton extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAvailabilityChange',
            'handleClick'
        ]);
        this.state = {available: canInstallApp()};
    }

    componentDidMount () {
        this.unsubscribe = subscribeInstallAvailability(this.handleAvailabilityChange);
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    handleAvailabilityChange (available) {
        this.setState({available});
    }

    handleClick () {
        promptInstallApp();
    }

    render () {
        if (!this.state.available) return null;
        return (
            <button
                aria-label={this.props.showLabel ? null : 'Baixar app'}
                className={classNames(styles.installAppButton, this.props.className)}
                title="Instalar o DoGoBlock como aplicativo neste computador"
                type="button"
                onClick={this.handleClick}
            >
                <Download
                    aria-hidden="true"
                    size={this.props.iconSize}
                />
                {this.props.showLabel ? <span className={styles.label}>{'Baixar app'}</span> : null}
            </button>
        );
    }
}

InstallAppButton.propTypes = {
    className: PropTypes.string,
    iconSize: PropTypes.number,
    showLabel: PropTypes.bool
};

InstallAppButton.defaultProps = {
    iconSize: 16,
    showLabel: true
};

export default InstallAppButton;
