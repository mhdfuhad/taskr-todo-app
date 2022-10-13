export default function Tabs(props) {
  // on click add random tasks function
  return (
    <div className="relative bg-stone-400 flex justify-around text-xl md:justify-center md:flex-col md:h-screen md:w-1/5 md:text-4xl 2xl:text-7xl">
      <div
        className={`cursor-pointer hover:bg-stone-600 w-full text-center py-6 transition ease-in-out duration-500 ${
          props.tab.activeTab === 0
            ? "border-b-8 md:border-r-8 md:border-b-0 border-stone-800 bg-stone-600 "
            : ""
        }`}
        onClick={() => props.tab.setActiveTab(0)}
      >
        All
      </div>
      <div
        className={`cursor-pointer hover:bg-stone-600 w-full text-center py-6 transition ease-in-out duration-500 ${
          props.tab.activeTab === 1
            ? "border-b-8 md:border-r-8 md:border-b-0 border-stone-800 bg-stone-600 "
            : ""
        }`}
        onClick={() => props.tab.setActiveTab(1)}
      >
        Active
      </div>
      <div
        className={`cursor-pointer hover:bg-stone-600 w-full text-center py-6 transition ease-in-out duration-500 ${
          props.tab.activeTab === 2
            ? "border-b-8 md:border-r-8 md:border-b-0 border-stone-800 bg-stone-600 "
            : ""
        }`}
        onClick={() => props.tab.setActiveTab(2)}
      >
        Completed
      </div>
      <div className="flex gap-10 fixed bottom-10 left-10  md:absolute md:left-1/2 md:bottom-14 md:-translate-x-1/2">
        {props.tab.activeTab === 2 ? (
          <button
            onClick={props.deleteAll}
            className="flex flex-col items-center"
          >
            <span className="material-symbols-outlined text-center border-4 p-1 rounded-full border-stone-800 text-stone-800 md:transition-all md:ease-out md:duration-300 md:text-5xl md:hover:bg-stone-800/20 ">
              delete
            </span>
            <label className="text-lg">Clear List</label>
          </button>
        ) : (
          <button onClick={props.add} className="flex flex-col items-center">
            <span className="material-symbols-outlined text-center border-4 p-1 rounded-full border-stone-800 text-stone-800 md:transition-all md:ease-out md:duration-300 md:text-5xl md:hover:bg-stone-800/20 ">
              add
            </span>
            <label className="text-lg">Add New</label>
          </button>
        )}
      </div>
    </div>
  );
}
