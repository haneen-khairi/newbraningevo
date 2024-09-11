import normSort, { normSortColumn } from "@/utils/normSort";

const initialState = {
    searchKeyword: null,
    pageSize: 10,
    page: 1,
    sortType: 'desc',
    sortField: 'createdAt',
    isActive: null
}

export default function ApiOptions(state = initialState, action) {
    switch (action.type) {
        case 'search':
            return {
                ...state,
                searchKeyword: !!action.payload.trim() ? action.payload.trim() : null,
            }
        case 'paginate':
            return {
                ...state,
                pageSize: action.payload.pageSize,
                page: action.payload.current,
                pageIndex: action.payload.current
            }

        case 'sort':
            if (!action.payload.order) {
                return {
                    ...state,
                    sortType: null,
                    sortField: null
                }
            }
            return {
                ...state,
                sortType: normSort(action.payload.order),
                SortDirection: normSort(action.payload.order),
                sortField: normSortColumn(action.payload.field)
            }
        case 'status':
            return {
                ...state,
                isActive: action.payload
            }

        default:
            return state
    }
}
export { initialState }