import React from 'react';

const toggle = ({ checked, onChange }) => (
    <span className="toggle-control">
        <input
            className="dmcheck"
            type="checkbox"
            checked={checked}
            onChange={onChange}
            id="dmcheck"
        />
        <label htmlFor="dmcheck" />
    </span>
);

export default toggle;
