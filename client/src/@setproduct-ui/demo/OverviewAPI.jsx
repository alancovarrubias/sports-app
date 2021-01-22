import React from "react";

const OverviewAPI = props => {
  const { data } = props;

  return (
    <div className="api-container">
      {data.map((i, count) => (
        <div className="api-prop-container" key={count}>
          <div>
            <code className="api-prop-name">{i.prop}</code>
          </div>
          <div className="api-prop-type">{i.type}</div>

          <div className="api-prop-desc">{i.desc}</div>
        </div>
      ))}
    </div>
  );
};

export default OverviewAPI;
