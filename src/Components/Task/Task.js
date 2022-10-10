export default function Task(props) {
  return (
    props.children && (
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div
              className="cursor-pointer border-2 rounded-full w-7 h-7 border-gray-400 flex items-center justify-center "
              onClick={() => props.update(props.id)}
            >
              {props.checked || false ? (
                <div className="bg-orange-600 w-5 h-5 rounded-full transition ease-in-out"></div>
              ) : (
                <div className="hover:bg-orange-600 w-5 h-5 rounded-full transition ease-out duration-500"></div>
              )}
            </div>
            <span
              className={`ml-2 text-3xl font-medium text-gray-600 ${
                props.checked || false ? "line-through" : ""
              }`}
            >
              {props.children}
            </span>
          </div>

          {props.tab === 2 && (
            <button onClick={() => props.delete(props.id)}>
              <span className="material-symbols-outlined text-3xl cursor-pointer">
                delete
              </span>
            </button>
          )}
        </div>
        <hr className="mb-3 border-2"></hr>
      </div>
    )
  );
}
