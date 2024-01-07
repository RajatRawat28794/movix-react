import React from "react";

import "./style.scss";
// iss se hum apne content ko center or align karenge ...isme hum component ko wrap krdenge like line 6
const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;