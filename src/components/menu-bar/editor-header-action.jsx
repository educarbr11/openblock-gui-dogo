import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './menu-bar.css';

const EditorHeaderAction = ({checked, disabled, hint, icon: Icon, label, onClick, stateLabel}) => (
    <button
        aria-checked={typeof checked === 'boolean' ? checked : null}
        aria-disabled={disabled || null}
        className={styles.actionItem}
        role={typeof checked === 'boolean' ? 'menuitemcheckbox' : 'menuitem'}
        tabIndex={-1}
        title={hint || label}
        type="button"
        onClick={disabled ? null : onClick}
    >
        {Icon ? <Icon
            aria-hidden="true"
            size={18}
        /> : null}
        <span className={styles.actionCopy}>
            <span className={styles.actionLabel}>{label}</span>
            {hint ? <span className={styles.actionHint}>{hint}</span> : null}
        </span>
        {typeof checked === 'boolean' ? (
            <span className={styles.actionCheck}>
                {stateLabel}
                <span
                    aria-hidden="true"
                    className={classNames(styles.actionToggle, {[styles.actionToggleChecked]: checked})}
                />
            </span>
        ) : null}
    </button>
);

EditorHeaderAction.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    hint: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({render: PropTypes.func})]),
    label: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    stateLabel: PropTypes.string
};

export default EditorHeaderAction;
