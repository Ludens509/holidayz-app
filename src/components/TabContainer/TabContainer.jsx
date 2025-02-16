import PropTypes from "prop-types";

function TabContainer({ children }) {
  return <div className="py-2 m-1">{children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabContainer;
