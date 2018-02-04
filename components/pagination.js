const Pagination = (props) => (
    
    <ul className="actions pagination">
        <li>
            <a href={"/" + props.pagination.previousPage} className={(props.pagination.previousDisabled ? "disabled " : "") + "button big previous"}>Previous Page</a>
        </li>
        <li>
            <a href={"/" + props.pagination.nextPage} className={(props.pagination.nextDisabled ? "disabled " : "") + "button big next"}>Next Page</a>
        </li>
    </ul>
)

export default Pagination