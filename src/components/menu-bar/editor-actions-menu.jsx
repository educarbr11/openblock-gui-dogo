import classNames from 'classnames';
import {ChevronDown, MoreHorizontal} from 'lucide-react';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './editor-actions-menu.css';

let nextMenuId = 0;
const ITEM_SELECTOR = '[role="menuitem"], [role="menuitemcheckbox"]';
const FOCUSABLE_SELECTOR = `${ITEM_SELECTOR}, select, button:not([role])`;

class EditorActionsMenu extends React.Component {
    constructor (props) {
        super(props);
        this.state = {open: false};
        this.menuId = `editor-actions-menu-${++nextMenuId}`;
        this.rootRef = React.createRef();
        this.triggerRef = React.createRef();
        this.menuRef = React.createRef();
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.handleTriggerClick = this.handleTriggerClick.bind(this);
        this.handleTriggerKeyDown = this.handleTriggerKeyDown.bind(this);
        this.handleMenuKeyDown = this.handleMenuKeyDown.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleMenuClickCapture = this.handleMenuClickCapture.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    componentDidMount () {
        document.addEventListener('mousedown', this.handleOutsideClick);
        document.addEventListener('touchstart', this.handleOutsideClick);
    }
    componentWillUnmount () {
        document.removeEventListener('mousedown', this.handleOutsideClick);
        document.removeEventListener('touchstart', this.handleOutsideClick);
    }
    getItems () {
        if (!this.menuRef.current) return [];
        return Array.from(this.menuRef.current.querySelectorAll(FOCUSABLE_SELECTOR))
            .filter(item => {
                if (item.disabled) return false;
                for (let parent = item; parent && parent !== this.menuRef.current; parent = parent.parentElement) {
                    const style = window.getComputedStyle(parent);
                    if (parent.hidden || style.display === 'none' || style.visibility === 'hidden') return false;
                }
                return true;
            });
    }
    getItemForTarget (target) {
        for (let item = target; item && item !== this.menuRef.current; item = item.parentElement) {
            if (!item.getAttribute) continue;
            const role = item.getAttribute('role');
            if (role === 'menuitem' || role === 'menuitemcheckbox') return item;
            if (item.tagName === 'BUTTON') return item;
        }
        return null;
    }
    openMenu (last = false) {
        this.setState({open: true}, () => {
            const items = this.getItems();
            const enabledItems = items.filter(item => item.getAttribute('aria-disabled') !== 'true');
            const focusableItems = enabledItems.length ? enabledItems : items;
            const item = last ? focusableItems[focusableItems.length - 1] : focusableItems[0];
            (item || this.menuRef.current).focus();
        });
    }
    closeMenu (returnFocus = false, preserveOutsideFocus = false) {
        const menu = this.menuRef.current;
        this.setState({open: false}, () => {
            const focusedElement = document.activeElement;
            const focusStayedInMenu = !focusedElement || focusedElement === document.body ||
                (menu && menu.contains(focusedElement)) || !document.documentElement.contains(focusedElement);
            if (returnFocus && this.triggerRef.current && (!preserveOutsideFocus || focusStayedInMenu)) {
                this.triggerRef.current.focus();
            }
        });
    }
    handleOutsideClick (event) {
        if (this.state.open && this.rootRef.current && !this.rootRef.current.contains(event.target)) {
            this.closeMenu();
        }
    }
    handleTriggerClick () {
        if (this.props.disabled) return;
        if (this.state.open) this.closeMenu();
        else this.openMenu();
    }
    handleTriggerKeyDown (event) {
        if (this.props.disabled) return;
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            this.openMenu(event.key === 'ArrowUp');
        } else if (event.key === 'Escape' && this.state.open) {
            event.preventDefault();
            this.closeMenu(true);
        }
    }
    handleMenuKeyDown (event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            this.closeMenu(true);
            return;
        }
        if (event.key === 'Tab') {
            // Let the browser continue from the trigger after removing the menu.
            this.closeMenu(true);
            return;
        }
        if (event.target.tagName === 'SELECT') return;
        const items = this.getItems();
        const index = items.indexOf(document.activeElement);
        let nextIndex;
        switch (event.key) {
        case 'ArrowDown':
            nextIndex = (index + 1) % items.length;
            break;
        case 'ArrowUp':
            nextIndex = (index - 1 + items.length) % items.length;
            break;
        case 'Home':
            nextIndex = 0;
            break;
        case 'End':
            nextIndex = items.length - 1;
            break;
        default:
            return;
        }
        event.preventDefault();
        if (items[nextIndex]) items[nextIndex].focus();
    }
    handleMenuClickCapture (event) {
        const item = this.getItemForTarget(event.target);
        if (item && item.getAttribute('aria-disabled') === 'true') {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    handleMenuClick (event) {
        const item = this.getItemForTarget(event.target);
        if (item && item.getAttribute('aria-disabled') !== 'true') this.closeMenu(true, true);
    }
    handleBlur (event) {
        if (this.state.open && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) {
            this.closeMenu();
        }
    }
    render () {
        const {
            children,
            className,
            compact,
            disabled,
            icon,
            label,
            labelClassName,
            menuClassName,
            triggerClassName,
            triggerTitle
        } = this.props;
        return (
            <div
                className={classNames(styles.root, className, {[styles.compact]: compact})}
                ref={this.rootRef}
                onBlur={this.handleBlur}
            >
                <button
                    aria-controls={this.state.open ? this.menuId : null}
                    aria-expanded={this.state.open}
                    aria-haspopup="menu"
                    aria-label={label}
                    className={classNames(styles.trigger, triggerClassName)}
                    disabled={disabled}
                    ref={this.triggerRef}
                    title={triggerTitle || label}
                    type="button"
                    onClick={this.handleTriggerClick}
                    onKeyDown={this.handleTriggerKeyDown}
                >
                    {icon || <MoreHorizontal
                        aria-hidden="true"
                        size={20}
                    />}
                    <span className={classNames(styles.label, labelClassName)}>{label}</span>
                    <ChevronDown
                        aria-hidden="true"
                        className={styles.caret}
                        size={14}
                    />
                </button>
                {this.state.open ? (
                    <div
                        aria-label={label}
                        className={classNames(styles.menu, menuClassName)}
                        id={this.menuId}
                        ref={this.menuRef}
                        role="menu"
                        tabIndex={-1}
                        onClick={this.handleMenuClick}
                        onClickCapture={this.handleMenuClickCapture}
                        onKeyDown={this.handleMenuKeyDown}
                    >
                        {children}
                    </div>
                ) : null}
            </div>
        );
    }
}

EditorActionsMenu.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    compact: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: PropTypes.node,
    label: PropTypes.string.isRequired,
    labelClassName: PropTypes.string,
    menuClassName: PropTypes.string,
    triggerClassName: PropTypes.string,
    triggerTitle: PropTypes.string
};

export default EditorActionsMenu;
