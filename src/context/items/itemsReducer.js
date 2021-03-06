import {
	ITEM_CATEGORIE,
	ADD_ITEM,
	VALIDATE_ITEM,
	DELETE_ITEM,
	FOCUS_ITEM,
	UPDATE_ITEMSTAG,
	UPDATE_ITEMSDELETEDTAG,
	ITEM_BELONGSPROJECT,
	DONE_ITEM,
	CURRENT_ITEM,
	EDIT_ITEM,
	UNSELECT_ITEM,
	CURRENT_CATEGORY,
	FETCH_ITEMS
	/*ITEM_STATE,
	CURRENT_ITEM,
	UPDATE_ITEM,*/
} from "../../types";

export default (state, action) => {
	switch (action.type) {
		case FETCH_ITEMS:
			return {
				...state,
				items: action.payload
			}
		case CURRENT_CATEGORY:
			return {
				...state,
				currentcategory: action.payload
			}
		case ITEM_CATEGORIE:
			if (action.payload === "focus") {
				return {
					...state,
					focusitems: state.items.filter(
						(item) => item.focus === true && item.trash === false
					),
				};
			} else if (action.payload === "inbox") {
				return {
					...state,
					inboxitems: state.items.filter(
						(item) => item.category === action.payload && item.trash === false
					),
				};
			} else if (action.payload === "next") {
				return {
					...state,
					nextitems: state.items.filter(
						(item) => item.category === action.payload && item.trash === false
					),
				};
			} else if (action.payload === "waiting") {
				return {
					...state,
					waitingitems: state.items.filter(
						(item) => item.category === action.payload && item.trash === false
					),
				};
			} 
			
			else if (action.payload === "scheduled") {
				return {
					...state,
					scheduleditems: state.items.filter(
						(item) => item.category === action.payload && item.trash === false
					),
				};
			} else if (action.payload === "someday") {
				return {
					...state,
					somedayitems: state.items.filter(
						(item) => item.category === action.payload && item.trash === false
					),
				};
			} else if (action.payload === "projects") {
				return {
					...state,
					projectsitems: state.items.filter(
						(item) => item.category === action.payload && item.trash === false
					),
				};
			} else if (action.payload === "notebooks") {
				return {
					...state,
					notebooksitems: state.items.filter(
						(item) => item.category === action.payload && item.trash === false
					),
				};
			} else if (action.payload === "trash") {
				return {
					...state,
					trashitems: state.items.filter(
						(item) => item.trash === true
					),
				};
			}
			return {
				...state,
			};
			
		case ADD_ITEM:
			return {
				...state,
				items: [...state.items, action.payload],
				erroritem: false,
			};

		case VALIDATE_ITEM:
			return {
				...state,
				erroritem: true,
			};

		case DELETE_ITEM:
			return {
				...state,
				items: state.items.filter(
					(item) =>
						item.id !== action.payload.id &&
						action.payload.items.indexOf(item.id) === -1
				),
			};
		case FOCUS_ITEM:
			state.items.filter(
				(item) => item.id === action.payload.id
			)[0].focus = !action.payload.focus;
			return {
				...state,
			};

		case DONE_ITEM:
			state.items.filter(
				(item) => item.id === action.payload.id
			)[0].done = !action.payload.done;
			return {
				...state,
			};

		case UPDATE_ITEMSTAG:
			state.items.forEach((item) => {
				item.tags.forEach((tag) =>
					tag.id === action.payload.id
						? (tag.name = action.payload.name)
						: null
				);
				if (item.waiting) {
					if (item.waiting.id === action.payload.id) {
						item.waiting.name = action.payload.name;
					}
				}
			});
			return {
				...state,
			};

		case UPDATE_ITEMSDELETEDTAG:
			state.items.forEach((item) => {
				const newTags = item.tags.filter(
					(tag) => tag.id !== action.payload
				);
				item.tags = newTags;
				if (item.waiting) {
					if (item.waiting.id === action.payload) {
						item.waiting = null;
					}
				}
			});
			return {
				...state,
			};

		case ITEM_BELONGSPROJECT:
			return {
				...state,
			};

		case CURRENT_ITEM:
			return {
				...state,
				currentitem: action.payload,
			}

		case EDIT_ITEM:
			return {
				...state,
				items: state.items.map(item => item.id === action.payload.id ? action.payload : item),
				currentitem: null,
			}

		case UNSELECT_ITEM:
			return {
				...state,
				currentitem: null,
			}
		/*case UPDATE_ITEM:
        case ITEM_STATE:
            return {
                ...state,
                tareas: state.tareas.map(tarea => tarea.id === action.payload.id ? action.payload : tarea),
                tareaseleccionada: null
            }

        case CURRENT_ITEM:
            return {
                ...state,
                tareaseleccionada: action.payload
            }*/

		default:
			return state;
	}
};
