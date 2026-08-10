# Todo App — React Frontend (Today's Work)

## Overview
A React frontend for a Todo app that connects to a FastAPI backend at `http://127.0.0.1:8000`. Supports creating, listing, completing/toggling, and deleting todos. Edit functionality is planned but **not yet implemented**.

## Features Implemented
- **Fetch todos on load** — `useEffect` GET request populates the list on mount.
- **Add todo** — Controlled form input (`value` + `onChange`) posts a new todo to the backend and appends the server's response (with real `id`) to local state.
- **Duplicate prevention** — Case-insensitive check against existing titles before submitting; alerts the user if a match is found.
- **Toggle completed** — `updateCompleted(id)` finds the target todo, flips its `completed` value, sends a PUT request, and updates only that row in state using `map`.
- **Delete todo** — `deletehandler(id)` sends a DELETE request and removes the todo from local state using `filter`.
- **Form reset** — Input clears after submit via `finally { settitle("") }`, working correctly now that the input is a controlled component.
- **Non-submit action buttons** — All row buttons (`Edit`, `Delete`, toggle) use `type="button"` so they don't accidentally trigger form submission.

## Known Bugs Fixed Today
| Bug | Fix |
|---|---|
| `title` initialized as `useState([])` | Changed to `useState("")` |
| `console(data)` invalid call | Changed to `console.log(data)` |
| New todo not appearing after POST | Added `setData(prev => [...prev, newTodo])` |
| Input not clearing after submit | Bound `value={title}` to the `<input>` (was mistakenly on `<form>`) |
| `id` missing until page refresh | Backend fix — see FastAPI README (`response_model` mismatch) |
| Action buttons submitting the form | Added `type="button"` to Edit/Delete/toggle buttons |
| Duplicate todos allowed | Added case-insensitive `for...of` check with `window.alert` |
| `response.json()` not awaited in `updateCompleted` | Added missing `await` |

## Not Yet Done
- **Edit functionality** — needs `editingId` + `editTitle` state to toggle a row into an editable `<input>`, then PUT the updated title on save. Discussed but not implemented in code yet.
- No loading/error UI states (e.g. spinner, "failed to load" message).
- No confirmation dialog before delete.

## Next Steps
1. Implement edit mode (per-row inline input + Save button).
2. Add basic loading/error states around the initial fetch.
3. Consider extracting `updateCompleted`, `deletehandler`, and future `edithandler` into a custom hook or API service file to keep the component leaner.