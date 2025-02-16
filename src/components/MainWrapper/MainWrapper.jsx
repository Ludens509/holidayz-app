import PropTypes from "prop-types";

// Desc: MainWrapper component
function MainWrapper({ children }) {
  return (
    <>
      <section className=" min-w-[400px] mt-4">
        <div className="flex flex-col bg-white max-w-sm w-full h-full rounded-2xl p-2 shadow-lg">
          {children}
        </div>
      </section>
    </>
  );
}
MainWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainWrapper;
